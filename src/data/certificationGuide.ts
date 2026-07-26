// Substantive content for /certification/.
//
// The page was a quiz plus two credential cards (~340 words) and it carried the
// wrong names for both credentials: FCCE is Certified Consulting *Engineer*,
// not "Contracts Expert", and FCCP is Certified Consulting *Professional*, not
// "Contracts Practitioner". Corrected against FIDIC Credentialing Ltd and the
// site author's own credentials.
//
// Eligibility and pass marks below are as published by FIDIC Credentialing.
// They change; FCL is the authority, and the page says so.

import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;
type LList = Record<Lang, string[]>;

export interface CredentialProfile {
  code: string;
  fullName: string;
  who: L;
  requirements: LList;
  passMark: string;
}

export const credentials: CredentialProfile[] = [
  {
    code: 'FCCE',
    fullName: 'FIDIC Certified Consulting Engineer',
    who: {
      ru: 'Квалифицированные инженеры на руководящих позициях в консалтинговом инжиниринге. Подтверждает способность управлять и деловой, и технической стороной инфраструктурного проекта.',
      en: 'Qualified engineers in senior roles within consulting engineering. Validates the ability to manage both the business and the technical side of an infrastructure project.',
      uz: 'Konsalting injiniringida rahbarlik lavozimlaridagi malakali muhandislar. Infratuzilma loyihasining ham biznes, ham texnik tomonini boshqarish qobiliyatini tasdiqlaydi.',
    },
    requirements: {
      ru: [
        'не менее пяти лет в консалтинговом инжиниринге в инфраструктурном секторе',
        'высшее образование в области науки, технологий, инженерии или математики (STEM)',
        'профессиональная инженерная лицензия или статус Chartered / Professional Engineer',
      ],
      en: [
        'at least five years in consulting engineering in the infrastructure sector',
        'a degree in science, technology, engineering or mathematics (STEM)',
        'a professional engineering licence or Chartered / Professional Engineer status',
      ],
      uz: [
        'infratuzilma sektorida konsalting injiniringida kamida besh yil',
        'fan, texnologiya, muhandislik yoki matematika (STEM) sohasida oliy maʼlumot',
        'professional muhandislik litsenziyasi yoki Chartered / Professional Engineer maqomi',
      ],
    },
    passMark: '60%',
  },
  {
    code: 'FCCP',
    fullName: 'FIDIC Certified Consulting Professional',
    who: {
      ru: 'Специалисты с опытом консалтинга в инфраструктуре и строительстве, в том числе не инженеры: юристы, контрактные и коммерческие менеджеры, специалисты по закупкам.',
      en: 'Professionals with consulting experience in infrastructure and construction, including non-engineers: lawyers, contract and commercial managers, procurement specialists.',
      uz: 'Infratuzilma va qurilishda konsalting tajribasiga ega mutaxassislar, shu jumladan muhandis boʻlmaganlar: yuristlar, shartnoma va tijorat menejerlari, xarid mutaxassislari.',
    },
    requirements: {
      ru: [
        'не менее трёх лет консалтингового опыта в инфраструктуре и строительстве',
        'инженерное образование не обязательно',
        'понимание коммерческих и операционных вопросов, управления рисками, HR и финансов',
      ],
      en: [
        'at least three years of consulting experience in infrastructure and construction',
        'an engineering background is not required',
        'an understanding of commercial and operational issues, risk management, HR and finance',
      ],
      uz: [
        'infratuzilma va qurilishda kamida uch yil konsalting tajribasi',
        'muhandislik maʼlumoti shart emas',
        'tijorat va operatsion masalalar, risklarni boshqarish, HR va moliyani tushunish',
      ],
    },
    passMark: '65%',
  },
];

export interface CertificationCopy {
  intro: L;
  prepTitle: L;
  prep: LList;
  authorityTitle: L;
  authority: L;
  whoTitle: L;
  requirementsLabel: L;
  passMarkLabel: L;
  faqTitle: L;
  faq: { q: L; a: L }[];
  sourceNote: L;
}

export const certificationCopy: CertificationCopy = {
  intro: {
    ru: 'FIDIC Credentialing Ltd (FCL) администрирует две основные квалификации. Обе подтверждают компетенцию консультанта в инфраструктурном секторе, но рассчитаны на разные профили: FCCE — на инженеров на руководящих позициях, FCCP — в том числе на неинженерные роли. Различие важно на этапе выбора: требования к опыту и образованию у них разные.',
    en: 'FIDIC Credentialing Ltd (FCL) administers two principal credentials. Both validate a consultant’s competence in the infrastructure sector, but they target different profiles: FCCE is for engineers in senior roles, FCCP extends to non-engineering roles as well. The distinction matters at the point of choosing: the experience and education requirements differ.',
    uz: 'FIDIC Credentialing Ltd (FCL) ikkita asosiy malakani boshqaradi. Ikkalasi ham konsultantning infratuzilma sektoridagi kompetensiyasini tasdiqlaydi, lekin turli profillarga moʻljallangan: FCCE — rahbarlik lavozimlaridagi muhandislar uchun, FCCP — muhandis boʻlmagan rollarni ham qamrab oladi. Farq tanlash bosqichida muhim: ularning tajriba va taʼlim talablari har xil.',
  },
  prepTitle: {
    ru: 'Как готовиться',
    en: 'How to prepare',
    uz: 'Qanday tayyorlanish kerak',
  },
  prep: {
    ru: [
      'Начните с радужной серии: понимание того, чем Red, Yellow и Silver Book различаются по распределению рисков, — база для всего остального.',
      'Разберите цикл претензий по Sub-Clause 20.2 до автоматизма: сроки 28 и 84 дня, роль Инженера, переход к DAAB.',
      'Отработайте роль Инженера и механизм определения по Sub-Clause 3.7 — вопросы о нейтральности встречаются регулярно.',
      'Проверьте себя на пробном тесте выше, затем закройте пробелы по статьям базы знаний, а не по конспектам.',
      'Отдельно изучите ценности FIDIC — качество, честность, устойчивость: они не декоративны и входят в оцениваемый материал.',
    ],
    en: [
      'Start with the Rainbow Suite: understanding how the Red, Yellow and Silver Books differ on risk allocation underpins everything else.',
      'Work the Sub-Clause 20.2 claims cycle until it is automatic: the 28 and 84-day periods, the Engineer’s role, the step up to the DAAB.',
      'Drill the Engineer’s role and the determination mechanism under Sub-Clause 3.7 — questions on neutrality come up regularly.',
      'Test yourself above, then close the gaps against the knowledge base articles rather than summary notes.',
      'Study FIDIC’s values separately — quality, integrity, sustainability: they are not decorative and form part of the assessed material.',
    ],
    uz: [
      'Kamalak seriyasidan boshlang: Red, Yellow va Silver Book risklar taqsimoti boʻyicha qanday farq qilishini tushunish — qolgan hamma narsaning asosi.',
      'Sub-Clause 20.2 boʻyicha daʼvo siklini avtomatizmgacha oʻrganing: 28 va 84 kunlik muddatlar, Muhandis roli, DAAB ga oʻtish.',
      'Muhandis roli va Sub-Clause 3.7 boʻyicha qaror mexanizmini ishlab chiqing — neytrallik haqidagi savollar muntazam uchraydi.',
      'Yuqoridagi sinov testida oʻzingizni tekshiring, keyin boʻshliqlarni konspektlar boʻyicha emas, bilimlar bazasi maqolalari boʻyicha yoping.',
      'FIDIC qadriyatlarini alohida oʻrganing — sifat, halollik, barqarorlik: ular bezak emas va baholanadigan materialga kiradi.',
    ],
  },
  authorityTitle: {
    ru: 'Почему этим материалам можно доверять',
    en: 'Why this material can be trusted',
    uz: 'Nega bu materialga ishonish mumkin',
  },
  authority: {
    ru: 'Материалы FIDIC.uz готовит Лариса Белоусова — обладатель FCCE и FCCP, член FCCE Certification Committee в FIDIC Credentialing и член FIDIC Integrity Management Committee. То есть человек, который участвует в самой системе сертификации, а не пересказывает её со стороны.',
    en: 'The material on FIDIC.uz is prepared by Larisa Belousova — an FCCE and FCCP holder, a member of the FCCE Certification Committee at FIDIC Credentialing and a member of the FIDIC Integrity Management Committee. Someone inside the certification system rather than describing it from outside.',
    uz: 'FIDIC.uz materiallarini Larisa Belousova tayyorlaydi — FCCE va FCCP egasi, FIDIC Credentialing dagi FCCE Certification Committee aʼzosi va FIDIC Integrity Management Committee aʼzosi. Yaʼni sertifikatlash tizimini chetdan tasvirlaydigan emas, unda ishtirok etadigan odam.',
  },
  whoTitle: { ru: 'Для кого', en: 'Who it is for', uz: 'Kimlar uchun' },
  requirementsLabel: { ru: 'Требования', en: 'Requirements', uz: 'Talablar' },
  passMarkLabel: { ru: 'Проходной балл', en: 'Pass mark', uz: 'Oʻtish balli' },
  faqTitle: { ru: 'Вопросы о сертификации', en: 'Questions about certification', uz: 'Sertifikatlash boʻyicha savollar' },
  faq: [
    {
      q: {
        ru: 'Чем FCCE отличается от FCCP?',
        en: 'What is the difference between FCCE and FCCP?',
        uz: 'FCCE FCCP dan nimasi bilan farq qiladi?',
      },
      a: {
        ru: 'FCCE рассчитан на квалифицированных инженеров на руководящих позициях и требует профильного STEM-образования, инженерной лицензии и не менее пяти лет опыта в консалтинговом инжиниринге. FCCP доступен шире: не менее трёх лет консалтингового опыта в инфраструктуре и строительстве, при этом инженерное образование не обязательно — он подходит юристам, контрактным менеджерам и специалистам по закупкам.',
        en: 'FCCE targets qualified engineers in senior roles and requires a STEM degree, an engineering licence and at least five years in consulting engineering. FCCP is broader: at least three years of consulting experience in infrastructure and construction, with no engineering background required — it suits lawyers, contract managers and procurement specialists.',
        uz: 'FCCE rahbarlik lavozimlaridagi malakali muhandislarga moʻljallangan va STEM taʼlimi, muhandislik litsenziyasi hamda konsalting injiniringida kamida besh yil tajriba talab qiladi. FCCP kengroq: infratuzilma va qurilishda kamida uch yil konsalting tajribasi, muhandislik maʼlumoti esa shart emas — u yuristlar, shartnoma menejerlari va xarid mutaxassislariga mos.',
      },
    },
    {
      q: {
        ru: 'Нужно ли сдавать FCCP перед FCCE?',
        en: 'Do you need FCCP before FCCE?',
        uz: 'FCCE dan oldin FCCP topshirish kerakmi?',
      },
      a: {
        ru: 'Нет, это не последовательные ступени одной лестницы, а разные квалификации для разных профилей. Инженер, отвечающий требованиям FCCE, может идти сразу к ней. Выбор определяется вашим образованием, лицензией и характером роли, а не порядком сложности.',
        en: 'No. They are not sequential steps on one ladder but separate credentials for different profiles. An engineer who meets the FCCE requirements can go straight to it. The choice follows your education, licence and the nature of your role, not an order of difficulty.',
        uz: 'Yoʻq, bu bitta zinapoyaning ketma-ket bosqichlari emas, turli profillar uchun turli malakalar. FCCE talablariga javob beradigan muhandis toʻgʻridan-toʻgʻri unga borishi mumkin. Tanlov qiyinlik tartibi bilan emas, taʼlimingiz, litsenziyangiz va rolingiz xarakteri bilan belgilanadi.',
      },
    },
    {
      q: {
        ru: 'Как долго действует сертификат?',
        en: 'How long is the certification valid?',
        uz: 'Sertifikat qancha muddat amal qiladi?',
      },
      a: {
        ru: 'Сертификат FCCE действует три года с даты выдачи, после чего требуется подтверждение. Условия продления и требования к непрерывному профессиональному развитию задаёт FIDIC Credentialing, и их стоит проверять на fcl.fidic.org перед планированием: правила периодически обновляются.',
        en: 'The FCCE certification is valid for three years from the date of issue, after which recertification is required. Renewal conditions and continuing professional development requirements are set by FIDIC Credentialing and should be checked at fcl.fidic.org before planning: the rules are updated periodically.',
        uz: 'FCCE sertifikati berilgan sanadan uch yil amal qiladi, keyin tasdiqlash talab qilinadi. Uzaytirish shartlari va uzluksiz kasbiy rivojlanish talablarini FIDIC Credentialing belgilaydi va rejalashtirishdan oldin ularni fcl.fidic.org da tekshirish kerak: qoidalar vaqti-vaqti bilan yangilanadi.',
      },
    },
    {
      q: {
        ru: 'Помогает ли сертификация в тендерах МФО?',
        en: 'Does certification help in MDB tenders?',
        uz: 'Sertifikatlash XTB tenderlarida yordam beradimi?',
      },
      a: {
        ru: 'Прямого требования иметь FCCE или FCCP в закупочных документах банков обычно нет. Но квалификация ключевого персонала оценивается, и подтверждённая FIDIC компетенция усиливает позицию команды — особенно на ролях контрактного администрирования и претензионной работы. Проверять нужно критерии конкретного тендера, а не общее правило.',
        en: 'Bank bidding documents do not usually require FCCE or FCCP outright. But key personnel qualifications are evaluated, and FIDIC-verified competence strengthens a team’s position — particularly in contract administration and claims roles. Check the criteria of the specific tender rather than a general rule.',
        uz: 'Bank xarid hujjatlarida FCCE yoki FCCP ga bevosita talab odatda yoʻq. Lekin asosiy xodimlar malakasi baholanadi va FIDIC tasdiqlagan kompetensiya jamoa pozitsiyasini kuchaytiradi — ayniqsa shartnoma administratsiyasi va daʼvo ishi rollarida. Umumiy qoidani emas, muayyan tender mezonlarini tekshirish kerak.',
      },
    },
  ],
  sourceNote: {
    ru: 'Требования, проходные баллы и сроки действия приведены по данным FIDIC Credentialing Ltd (fcl.fidic.org) по состоянию на июль 2026 года. Правила периодически обновляются — перед подачей заявки сверяйтесь с первоисточником.',
    en: 'Requirements, pass marks and validity periods are stated per FIDIC Credentialing Ltd (fcl.fidic.org) as at July 2026. The rules are updated periodically — check the primary source before applying.',
    uz: 'Talablar, oʻtish ballari va amal qilish muddatlari FIDIC Credentialing Ltd (fcl.fidic.org) maʼlumotlari boʻyicha 2026 yil iyul holatiga koʻra berilgan. Qoidalar vaqti-vaqti bilan yangilanadi — ariza topshirishdan oldin birlamchi manba bilan solishtiring.',
  },
};
