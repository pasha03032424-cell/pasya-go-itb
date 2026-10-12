# Menyeimbangkan posisi kunci jawaban (A-E) dengan menukar dua opsi per soal.
# Aman: tidak menyentuh soal yang opsinya angka/urutan (agar tetap berurutan), memperbarui kunci,
# kunci pada "wrong", dan rujukan "opsi X" di pembahasan. Jalankan: python3 scripts/balance-answers.py
import json, glob, random, re, collections
random.seed(2026)
L5 = 'ABCDE'
def ordered(q):  # opsi bernomor/berurutan: jangan diacak
    return all(re.search(r'\d', o) for o in q['options'])
files = sorted(glob.glob('src/data/questions/*.json'))
data = {f: json.load(open(f)) for f in files}
fixed, flex = collections.Counter(), []
for f, L in data.items():
    for q in L:
        (fixed.update([q['answer']]) if ordered(q) else flex.append((f, q)))
random.shuffle(flex)
tot = collections.Counter(fixed)
for f, q in flex:
    low = min(tot.values()) if len(tot) == 5 else 0
    cands = [l for l in L5 if tot[l] == low] or list(L5)
    t = random.choice(cands); tot[t] += 1
    c = L5.index(q['answer']); ti = L5.index(t)
    if c == ti: continue
    q['options'][c], q['options'][ti] = q['options'][ti], q['options'][c]
    old, new = q['answer'], t; q['answer'] = new
    if q.get('wrong'):
        q['wrong'] = {(new if k == new else old if k == old else k): v for k, v in q['wrong'].items()}
        # kunci wrong mengikuti teks opsi: opsi lama di posisi 'new' kini ada di posisi 'old'
        q['wrong'] = {({old: new, new: old}.get(k, k)): v for k, v in json.load(open(f))[[x['id'] for x in json.load(open(f))].index(q['id'])].get('wrong', {}).items()}
    for k in ('explanation', 'tips'):
        q[k] = re.sub(r'\b([Oo]psi) ' + old + r'\b', lambda m: m.group(1) + ' ' + new, q[k])
for f, L in data.items(): json.dump(L, open(f, 'w'), ensure_ascii=False, indent=1)
final = collections.Counter(q['answer'] for L in data.values() for q in L)
print('sebaran akhir:', dict(sorted(final.items())), '| diacak:', len(flex), '| tetap:', sum(fixed.values()))
