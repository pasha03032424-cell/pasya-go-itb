import json
class Bank:
    def __init__(self, key, category):
        self.path = f'src/data/questions/{key}.json'; self.cat = category
        self.L = json.load(open(self.path)); self.nid = max(q['id'] for q in self.L) + 1
    def add(self, topic, sub, diff, question, opts, ans, expl, tips, time, wrong=None, passage=None):
        assert len(opts) == 5 and ans in 'ABCDE', (question, ans)
        q = dict(id=self.nid, category=self.cat, topic=topic, subtopic=sub, difficulty=diff)
        if passage: q['passage'] = passage
        q.update(question=question, options=opts, answer=ans, explanation=expl, tips=tips, time=time)
        if wrong: q['wrong'] = wrong
        self.L.append(q); self.nid += 1
    def save(self):
        json.dump(self.L, open(self.path, 'w'), ensure_ascii=False, indent=1)
        print(self.cat, '->', len(self.L), 'soal')
