export type Axis = 'S/G' | 'M/E' | 'R/T' | 'A/P' | 'C/F'
export type Pole = 'S' | 'G' | 'M' | 'E' | 'R' | 'T' | 'A' | 'P' | 'C' | 'F'
export interface Question { id: number; axis: Axis; pole: Pole; text: string }
export const axes: { id: Axis; left: Pole; right: Pole; leftLabel: string; rightLabel: string }[] = [
  { id: 'S/G', left: 'S', right: 'G', leftLabel: 'ソロ', rightLabel: 'グループ' },
  { id: 'M/E', left: 'M', right: 'E', leftLabel: 'マイペース', rightLabel: '熱烈応援' },
  { id: 'R/T', left: 'R', right: 'T', leftLabel: 'リスペクト', rightLabel: 'プロレス許容' },
  { id: 'A/P', left: 'A', right: 'P', leftLabel: '球場まるごと', rightLabel: '試合中心' },
  { id: 'C/F', left: 'C', right: 'F', leftLabel: '文脈重視', rightLabel: '自由柔軟' }
]
export const questions: Question[] = [
  {id:1,axis:'S/G',pole:'S',text:'連番相手がいなくても特に気にならない'},
  {id:2,axis:'S/G',pole:'S',text:'突発的にチケットを取って観に行くことがある'},
  {id:3,axis:'S/G',pole:'S',text:'近くの席の人と意気投合して仲良くなることがある'},
  {id:4,axis:'S/G',pole:'G',text:'試合を観ながらいろいろ語りたい'},
  {id:5,axis:'S/G',pole:'G',text:'ボックスシートで仲間と観るのがすき'},
  {id:6,axis:'M/E',pole:'M',text:'ホーム球場でも近くにビジターファンがいると気になる'},
  {id:7,axis:'M/E',pole:'M',text:'大型ビハインドの展開になった場合は途中でも帰る'},
  {id:8,axis:'M/E',pole:'E',text:'点が入ったら周りとハイタッチしたい'},
  {id:9,axis:'M/E',pole:'E',text:'飲食等はイニング間や守備のタイミングで買いに行きたい'},
  {id:10,axis:'M/E',pole:'E',text:'攻撃中は応援歌やチャンステーマを大声で歌う'},
  {id:11,axis:'R/T',pole:'R',text:'負けても相手チームのインタビューまで見る'},
  {id:12,axis:'R/T',pole:'R',text:'死球が当たってしまった際に選手がフォローに入るのは大事だ'},
  {id:13,axis:'R/T',pole:'T',text:'「あと1球」コールは特に気にならない'},
  {id:14,axis:'R/T',pole:'T',text:'「商魂込めて」はただのプロレスだと思う'},
  {id:15,axis:'R/T',pole:'T',text:'野次も野球の華だ'},
  {id:16,axis:'A/P',pole:'A',text:'売り子やチアにも推しがいる'},
  {id:17,axis:'A/P',pole:'A',text:'イニング間イベントも楽しみたい'},
  {id:18,axis:'A/P',pole:'A',text:'グルメは事前に気になるものを調べる'},
  {id:19,axis:'A/P',pole:'P',text:'一球ごとに次の配球を予想してしまう'},
  {id:20,axis:'A/P',pole:'P',text:'選手のグラウンド外の様子にはあまり関心がない'},
  {id:21,axis:'C/F',pole:'C',text:'ビジター観戦の際にはビジターユニフォームを着ていく'},
  {id:22,axis:'C/F',pole:'C',text:'負けた日はユニフォームを脱いで帰る'},
  {id:23,axis:'C/F',pole:'F',text:'移籍または引退した選手のユニフォームも着る'}
]
export const types: Record<string,{name:string; tagline:string; description:string; habit:string; good:string; clash:string}> = {
 SMRA:{name:'気ままな球場探訪家',tagline:'自分のペースで球場の魅力を発見する。',description:'観たい試合があれば一人でも球場へ。グルメやイベントも自分のペースで楽しみ、相手チームへの敬意も忘れない。',habit:'試合前に球場をひと回りして、気になるグルメやイベントをチェックする。',good:'GMRA',clash:'SETP'},
 SMRP:{name:'静かなる観戦職人',tagline:'自分のペースで、野球の奥深さを味わう。',description:'誰かと予定を合わせなくても、観たい試合には足を運ぶ。試合の流れやプレーの細部をじっくり観察し、相手の好プレーも評価する。',habit:'試合中は配球や守備位置を観察し、気になるプレーを後から振り返る。',good:'GMRP',clash:'GETA'},
 SMTA:{name:'自由奔放な野球通',tagline:'球場の個性も因縁も、気ままに楽しむ。',description:'一人で気ままに球場を楽しむ。グルメやイベントはもちろん、球団ごとの応援文化や因縁にも面白さを見いだす。',habit:'ビジター球場でも、その球場ならではのグルメや応援文化を楽しむ。',good:'GMTA',clash:'GERP'},
 SMTP:{name:'辛口の野球評論家',tagline:'勝負の機微を、自分の目で見極める。',description:'観戦は自分のペースで、関心はグラウンドの勝負に集中。野球談議では鋭い意見を持ち、ライバルとの煽り合いも文化として楽しむ。',habit:'試合後はイベントよりも、その日の采配やプレーについて考えている。',good:'GMTP',clash:'GERA'},
 SERA:{name:'情熱の球場愛好家',tagline:'一人でも、球場の楽しさを全力で。',description:'一人でも応援に全力。球場グルメやイベントも満喫しながら、選手や対戦相手への敬意を大切にする。',habit:'一人で来ていても、得点時には周囲と自然にハイタッチしている。',good:'GERA',clash:'GMTP'},
 SERP:{name:'一途な応援戦士',tagline:'一球一打に、まっすぐ声を届ける。',description:'誰かと一緒でなくても応援歌を歌い、チームの一球一打に熱くなる。試合と選手への敬意を大切にする。',habit:'攻撃中は応援に集中したいので、買い物はイニング間に済ませる。',good:'GERP',clash:'GMTA'},
 SETA:{name:'球場の自由人',tagline:'応援もイベントも、好きなだけ楽しむ。',description:'一人で球場へ乗り込み、応援もイベントも全力で楽しむ。ライバルとの因縁や応援文化も含めて野球を満喫する。',habit:'球場グルメを買い込んで、チャンステーマが始まれば全力で歌う。',good:'GETA',clash:'GMRP'},
 SETP:{name:'孤高の応援闘士',tagline:'一人でも、勝負の熱狂の中心へ。',description:'一人でも全力で声を出し、勝負の行方に熱狂する。対戦相手との因縁や煽りもプロレスとして受け止める。',habit:'劣勢でも応援の手を緩めず、試合終了まで声を張り上げる。',good:'GETP',clash:'GMRA'},
 GMRA:{name:'球場の社交家',tagline:'仲間と分かち合う、球場の楽しさ。',description:'仲間と会話を楽しみながら、グルメやイベントも満喫する。対戦相手への敬意を持ち、穏やかな球場体験を好む。',habit:'試合前から仲間と待ち合わせ、球場グルメを選ぶ時間も楽しみの一つ。',good:'SMRA',clash:'SETP'},
 GMRP:{name:'理知的な観戦仲間',tagline:'野球の面白さを、仲間と深く語る。',description:'仲間と試合展開や采配について語り合いながら、落ち着いて野球を楽しむ。好プレーは敵味方を問わず評価する。',habit:'隣の仲間と「次は何を投げると思う？」と配球予想をしている。',good:'SMRP',clash:'SETA'},
 GMTA:{name:'陽気な野球遊覧家',tagline:'仲間と巡る、にぎやかな球場体験。',description:'仲間と球場を訪れ、試合以外の楽しみも共有する。応援文化のクセやライバルとの掛け合いも面白がれる。',habit:'仲間と球場限定グルメを食べ比べながら、応援文化について盛り上がる。',good:'SMTA',clash:'SERP'},
 GMTP:{name:'毒舌の野球談義家',tagline:'辛口トークも、仲間との観戦の醍醐味。',description:'仲間と野球を語る時間が大好き。采配やプレーへの辛口な意見も、野球談議の楽しみとして共有する。',habit:'試合後も仲間との采配談義が終わらず、球場を出てからも話し続ける。',good:'SMTP',clash:'SERA'},
 GERA:{name:'球場のムードメーカー',tagline:'仲間と一緒に、球場をもっと楽しく。',description:'仲間と声を合わせて応援し、グルメやイベントも一緒に楽しむ。相手への敬意を忘れず、球場全体の雰囲気を大切にする。',habit:'得点時には仲間とハイタッチ。試合前のイベントもみんなで楽しむ。',good:'SERA',clash:'SMTP'},
 GERP:{name:'熱血応援リーダー',tagline:'仲間と声を合わせ、勝負の瞬間へ。',description:'仲間と応援歌を歌い、試合の一瞬一瞬に全力を注ぐ。選手への敬意を持ちながら、チームを熱く後押しする。',habit:'攻撃中は全員で応援に集中し、買い物はイニング間に済ませる。',good:'SERP',clash:'SMTA'},
 GETA:{name:'お祭り応援団長',tagline:'球場の熱気も楽しさも、全部まとめて。',description:'仲間と球場のあらゆる楽しみを共有する。応援歌もイベントも全力で、ライバルとの因縁も野球の醍醐味として楽しむ。',habit:'試合前から仲間と盛り上がり、チャンスが来れば全員で大合唱する。',good:'SETA',clash:'SMRP'},
 GETP:{name:'闘魂の応援隊長',tagline:'仲間と燃える、勝負の最前線。',description:'仲間と全力でチームを応援し、勝負の行方に熱狂する。ライバルとの対決や因縁にも燃える、試合中心の応援派。',habit:'仲間と応援歌を熱唱し、試合後も勝負の分かれ目を熱く語り合う。',good:'SETP',clash:'SMRA'}
}
