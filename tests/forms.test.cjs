const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context=vm.createContext({window:{}});
for(const name of ['supplemental-data.js','forms-library.js'])vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'..',name),'utf8'),context);
const library=context.window.IDJLT_FORM_LIBRARY,verbs=context.window.IDJLT_GRAMMAR_MATERIALS.verbs;
const form=(jp,id)=>library.conjugate(verbs.find(v=>v.jp===jp),id);
for(const [jp,id,expected] of [
 ['よむ','masu','よみます'],['たべる','masen','たべません'],['くる','mashita','きました'],['する','masen-deshita','しませんでした'],
 ['かう','nai','かわない'],['くる','nai','こない'],['する','nakatta','しなかった'],['いく','ta','いった'],['およぐ','ta','およいだ'],['よむ','ta','よんだ'],
 ['かえる','tai','かえりたい'],['くる','tai','きたい'],['コピーする','tai','コピーしたい'],['たべる','takunai','たべたくない'],['みる','takatta','みたかった'],['する','takunakatta','したくなかった'],['よむ','takute','よみたくて'],
 ['よむ','te-imasu','よんでいます'],['かく','te-kudasai','かいてください'],['まつ','te-mo-ii','まってもいいです'],['いく','te-kara','いってから'],
 ['くる','naide-kudasai','こないでください'],['かう','nakereba','かわなければなりません'],['たべる','nakutemo','たべなくてもいいです'],['くる','mashou','きましょう'],
 ['する','potential','できる'],['くる','potential','こられる'],['たべる','potential','たべられる'],['かく','potential','かける'],['する','passive','される'],['かう','causative','かわせる'],['くる','causative','こさせる'],['くる','volitional','こよう'],['よむ','ba','よめば'],['みる','tara','みたら'],['よむ','tari','よんだり']
])assert.equal(form(jp,id),expected,`${jp} ${id}`);
assert.equal(library.conjugate({jp:'ある',group:'1',te:'あって'},'nai'),'ない');
assert.equal(new Set(library.forms.map(f=>f.id)).size,library.forms.length);
assert.deepEqual(Array.from(library.samples.filter(v=>v.group==='1'),v=>v.jp.slice(-1)).sort(),['う','く','ぐ','す','つ','ぬ','ぶ','む','る'].sort());
assert.deepEqual(Array.from(library.samples.filter(v=>v.group==='1'),v=>library.conjugate(v,'masu')),['かいます','かきます','およぎます','はなします','まちます','しにます','あそびます','よみます','かえります']);
for(const f of library.forms){for(const lang of ['ru','en']){assert(f[lang]&&f.purpose[lang]&&f.rule[lang]&&f.example[lang]);}for(const v of verbs)assert.equal(typeof library.conjugate(v,f.id),'string',`${v.jp} ${f.id}`);}
console.log(`PASS: ${library.forms.length} forms, bilingual explanations and irregular/group conjugation checks.`);
