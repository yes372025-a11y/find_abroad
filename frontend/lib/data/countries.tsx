import React from "react";

export type CountryData = {
  slug: string;
  name: string;
  flag: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: React.ReactNode;
  heroDescription: string;
  facts: { label: string; value: string }[];
  highlights: { num: string; title: string; body: string }[];
  process: { step: string; label: string; desc: string }[];
  topCourses: { name: string; avg: string }[];
  costOfLiving: { category: string; monthly: string }[];
  visaSteps: { step: string; title: string; desc: string }[];
  scholarships: { name: string; type: string; deadline: string; body: string }[];
};

export const COUNTRIES_DATA: Record<string, CountryData> = {
  "usa": {
    slug: "usa",
    name: "United States of America",
    flag: "🇺🇸",
    metaTitle: "Study in United States of America — Find Abroad",
    metaDescription: "Explore 180+ US universities with expert counselor support. F-1 visa, OPT work authorisation, world-class research programmes.",
    heroTitle: <>Study in<br />the USA</>,
    heroDescription: `The world's most sought-after study destination. Home to 180+ top-ranked universities,
            generous post-study work options, and a campus culture unlike any other.`,
    facts: [
  { label: "Avg Tuition",   value: "USD 25,000–70,000" },
  { label: "Visa Type",     value: "F-1 Student Visa" },
  { label: "Intakes",       value: "Fall (Sep) · Spring (Jan)" },
  { label: "Universities",  value: "180+" },
],
    highlights: [
  { num: "01", title: "World-class research",        body: "Home to MIT, Stanford, Harvard and hundreds of R1 research universities with cutting-edge facilities." },
  { num: "02", title: "OPT work authorisation",      body: "12–36 months of Optional Practical Training lets you gain US work experience after graduating." },
  { num: "03", title: "Diverse campus culture",      body: "International student populations from 150+ countries on every major campus." },
  { num: "04", title: "Strong alumni networks",      body: "US degrees open doors globally; alumni associations span every industry and continent." },
],
    process: [
  { step: "01", label: "Profile Evaluation",   desc: "Our counsellors assess your academics, scores, and goals." },
  { step: "02", label: "University Shortlist",  desc: "Curated list of reach, match, and safety schools." },
  { step: "03", label: "Application Support",   desc: "SOP, LOR, essays, and form submission guidance." },
  { step: "04", label: "Visa Preparation",      desc: "DS-160, I-20, SEVIS fee, and mock interview coaching." },
],
    topCourses: [
  { name: "Computer Science",   avg: "USD 30,000/yr" },
  { name: "MBA",                avg: "USD 45,000/yr" },
  { name: "Engineering",        avg: "USD 32,000/yr" },
  { name: "Medicine / Pre-med", avg: "USD 40,000/yr" },
  { name: "Law (JD)",           avg: "USD 50,000/yr" },
  { name: "Data Science",       avg: "USD 28,000/yr" },
],
    costOfLiving: [
  { category: "Rent (studio/shared)",   monthly: "USD 900–1,800" },
  { category: "Food & groceries",       monthly: "USD 300–500"   },
  { category: "Transport (monthly pass)", monthly: "USD 80–120"  },
  { category: "Health insurance",       monthly: "USD 100–200"  },
  { category: "Entertainment",          monthly: "USD 100–200"  },
],
    visaSteps: [
  { step: "01", title: "Receive I-20 from university", desc: "After admission, your university issues Form I-20. This is required before you can apply for the F-1 visa." },
  { step: "02", title: "Pay SEVIS fee", desc: "Pay the USD 350 SEVIS I-901 fee at fmjfee.com before scheduling your visa interview." },
  { step: "03", title: "Complete DS-160 form", desc: "Fill the online Non-immigrant Visa application (DS-160) at ceac.state.gov with accurate and complete information." },
  { step: "04", title: "Schedule and attend visa interview", desc: "Book F-1 visa interview at the nearest US Consulate. Bring I-20, financial docs, SEVIS receipt, offer letter, and academic records." },
],
    scholarships: [
  { name: "Fulbright-Nehru Fellowship", type: "Full Funding", deadline: "May each year", body: "Prestigious exchange program for Masters and PhD students going to the USA — covers tuition, living, and insurance." },
  { name: "Hubert H. Humphrey Fellowship", type: "Full Funding", deadline: "Sep each year", body: "Non-degree program for mid-career professionals from developing countries. Covers all expenses." },
  { name: "University Merit Scholarships", type: "Partial — up to USD 30,000/yr", deadline: "With application", body: "Most top US universities offer automatic merit scholarships — Harvard, MIT, Stanford, and others offer need-blind admissions to international students." },
],
  },
  "uk": {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    metaTitle: "Study in United Kingdom — Find Abroad",
    metaDescription: "Explore 130+ UK universities with expert counselor support. Student Visa, 2-year Graduate Route, world-renowned institutions.",
    heroTitle: <>Study in<br />the UK</>,
    heroDescription: `From Oxford to Edinburgh, the UK offers world-class education in a compact, 
            efficient format — 1-year Masters, a 2-year post-study work visa, and 
            unmatched academic prestige.`,
    facts: [
  { label: "Avg Tuition",  value: "GBP 15,000–35,000" },
  { label: "Visa Type",    value: "Student Visa (Tier 4)" },
  { label: "Intakes",      value: "Sep · Jan" },
  { label: "Universities", value: "130+" },
],
    highlights: [
  { num: "01", title: "Shorter Masters programmes",  body: "UK Masters degrees are typically 1 year — you enter the workforce faster and pay significantly less in tuition." },
  { num: "02", title: "Graduate Route work visa",    body: "Stay and work for 2 years (3 for PhD) after graduating without needing a job offer to apply." },
  { num: "03", title: "Historic institutions",       body: "Oxford, Cambridge, Imperial, LSE, UCL — institutions with centuries of academic excellence." },
  { num: "04", title: "Rich cultural experience",   body: "Study in one of the world's most international cities with access to Europe on your doorstep." },
],
    process: [
  { step: "01", label: "Profile Evaluation",  desc: "We assess your academics, English scores, and career goals." },
  { step: "02", label: "University Shortlist", desc: "Curated reach, match, and safety schools across the UK." },
  { step: "03", label: "Application Support",  desc: "Personal statement, references, UCAS or direct applications." },
  { step: "04", label: "Visa Preparation",     desc: "CAS letter, TB test, financial docs, and biometric appointment." },
],
    topCourses: [
  { name: "Computer Science",  avg: "GBP 18,000/yr" },
  { name: "MBA / Business",    avg: "GBP 22,000/yr" },
  { name: "Engineering",       avg: "GBP 20,000/yr" },
  { name: "Medicine & Health", avg: "GBP 25,000/yr" },
  { name: "Law",               avg: "GBP 19,000/yr" },
  { name: "Finance",           avg: "GBP 21,000/yr" },
],
    costOfLiving: [
  { category: "Rent (student room)",    monthly: "GBP 600–900" },
  { category: "Food & groceries",       monthly: "GBP 200–300" },
  { category: "Transport (monthly pass)", monthly: "GBP 80–160" },
  { category: "Utilities",              monthly: "GBP 50–80"  },
  { category: "Entertainment",          monthly: "GBP 50–100" },
],
    visaSteps: [
  { step: "01", title: "Get your CAS", desc: "Conditional Acceptance of Studies letter from your UK university — issued after meeting all academic conditions." },
  { step: "02", title: "Financial evidence", desc: "Show GBP 1,334/month (London) or GBP 1,023/month (outside London) held for 28 consecutive days in your bank account." },
  { step: "03", title: "TB test", desc: "Mandatory tuberculosis test from an approved clinic in India — results valid for 6 months." },
  { step: "04", title: "Online application + biometrics", desc: "Apply on gov.uk, pay IHS surcharge (GBP 776/year), book biometric appointment at a UK Visa Application Centre in India." },
],
    scholarships: [
  { name: "Chevening Scholarship", type: "Full Funding", deadline: "Nov each year", body: "UK government scholarship covering full tuition, living costs, and return flights for a 1-year Masters." },
  { name: "Commonwealth Scholarships", type: "Full Funding", deadline: "Dec each year", body: "For students from Commonwealth countries. Covers tuition, living, and travel." },
  { name: "GREAT Scholarship", type: "Partial — GBP 10,000+", deadline: "Varies", body: "Partnership between British Council and UK universities — available for Indian students at 30+ institutions." },
],
  },
  "canada": {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    metaTitle: "Study in Canada — Find Abroad",
    metaDescription: "Explore 60+ Canadian universities. Study Permit, 3-year PGWP, pathway to permanent residency — expert counselor support.",
    heroTitle: <>Study in<br />Canada</>,
    heroDescription: `A top-tier education system with one of the most welcoming immigration 
            pathways in the world. Study, work, and build your future in Canada.`,
    facts: [
  { label: "Avg Tuition",  value: "CAD 20,000–50,000" },
  { label: "Visa Type",    value: "Study Permit" },
  { label: "Intakes",      value: "Sep · Jan · May" },
  { label: "Universities", value: "60+" },
],
    highlights: [
  { num: "01", title: "Post-grad work permit",     body: "PGWP lets you work in Canada for up to 3 years after graduation — directly tied to the length of your programme." },
  { num: "02", title: "Pathway to PR",             body: "Express Entry, Provincial Nominee Programs, and the Canadian Experience Class make PR accessible for graduates." },
  { num: "03", title: "Multicultural & safe",      body: "Canada consistently ranks among the world's safest and most welcoming countries for international students." },
  { num: "04", title: "World-class cities",        body: "Study in Toronto, Vancouver, Montreal, or Ottawa — global cities with vibrant tech and finance ecosystems." },
],
    process: [
  { step: "01", label: "Profile Evaluation",   desc: "Academic assessment, English scores, and immigration pathway planning." },
  { step: "02", label: "University Shortlist",  desc: "DLI-designated institutions matched to your profile and budget." },
  { step: "03", label: "Application Support",   desc: "SOP, LOR, transcript evaluation, and submission tracking." },
  { step: "04", label: "Study Permit",          desc: "SDS or regular stream application, biometrics, and IRCC portal guidance." },
],
    topCourses: [
  { name: "Computer Science",  avg: "CAD 25,000/yr" },
  { name: "Engineering",       avg: "CAD 27,000/yr" },
  { name: "Business/MBA",      avg: "CAD 30,000/yr" },
  { name: "Nursing",           avg: "CAD 22,000/yr" },
  { name: "Data Analytics",    avg: "CAD 24,000/yr" },
],
    costOfLiving: [
  { category: "Rent",                    monthly: "CAD 1,000–1,600" },
  { category: "Food",                    monthly: "CAD 350–500"   },
  { category: "Transport",               monthly: "CAD 100–140"  },
  { category: "Phone",                   monthly: "CAD 40–60"   },
  { category: "Entertainment",           monthly: "CAD 80–150"  },
],
    visaSteps: [
  { step: "01", title: "Receive your offer letter", desc: "Get a letter of acceptance from a Designated Learning Institution (DLI) in Canada before applying for a study permit." },
  { step: "02", title: "Gather financial documents", desc: "Prove you have sufficient funds: CAD 10,000/year (outside Quebec) plus tuition, or CAD 11,000/year (Quebec). Bank statements, ITR, and sponsorship letters required." },
  { step: "03", title: "Apply for Study Permit", desc: "Apply online via IRCC portal or through an SDS (Student Direct Stream) for faster processing. Biometrics required for Indian applicants." },
  { step: "04", title: "Port of Entry (POE) letter", desc: "Once approved, you receive a Port of Entry letter and visa stamp. You’ll get the actual study permit issued at the Canadian border on arrival." },
],
    scholarships: [
  { name: "Vanier Canada Graduate Scholarships", type: "Full Funding — CAD 50,000/yr", deadline: "Nov each year", body: "Highly competitive federal scholarship for doctoral students demonstrating academic excellence and leadership." },
  { name: "University of Toronto Excellence Award", type: "Partial — up to CAD 10,000", deadline: "With application", body: "Automatic entrance scholarship for high-achieving international students at the University of Toronto." },
  { name: "UBC International Major Entrance Scholarship", type: "Partial — up to CAD 10,000", deadline: "With application", body: "Offered at UBC to top-performing international undergraduate applicants across faculties." },
],
  },
  "australia": {
    slug: "australia",
    name: "Commonwealth of Australia",
    flag: "🇦🇺",
    metaTitle: "Study in Commonwealth of Australia — Find Abroad",
    metaDescription: "Explore 45+ Australian universities. Subclass 500 visa, post-study work rights, and globally respected degrees.",
    heroTitle: <>Study in<br />Australia</>,
    heroDescription: `Build a global career with world-ranked universities, practical learning,
            and strong post-study work pathways in one of the safest student destinations.`,
    facts: [
  { label: "Avg Tuition", value: "AUD 25,000–50,000" },
  { label: "Visa Type", value: "Student Visa (Subclass 500)" },
  { label: "Intakes", value: "Feb · Jul" },
  { label: "Universities", value: "45+" },
],
    highlights: [
  { num: "01", title: "Post-study work rights", body: "Stay and work in Australia after graduation for up to 2-4 years depending on your qualification level and study location." },
  { num: "02", title: "High quality of life", body: "Melbourne, Sydney, Brisbane, and Perth consistently rank among the world's most liveable student cities." },
  { num: "03", title: "Work while studying", body: "International students can work part-time during term and full-time during breaks to manage living expenses." },
  { num: "04", title: "Industry-focused education", body: "Australian universities are known for practical teaching, employability outcomes, and strong research across STEM, business, and health." },
],
    process: [
  { step: "01", label: "Profile Evaluation", desc: "Assess academics, English scores, and preferred city with budget planning." },
  { step: "02", label: "University Shortlist", desc: "Targeted options across Group of Eight and leading applied universities." },
  { step: "03", label: "Application Support", desc: "SOP review, documentation, and offer-letter tracking across universities." },
  { step: "04", label: "Visa Preparation", desc: "Subclass 500 file prep, GTE guidance, OSHC, and financial evidence support." },
],
    topCourses: [
  { name: "Engineering",       avg: "AUD 32,000/yr" },
  { name: "Business",          avg: "AUD 30,000/yr" },
  { name: "Computer Science",  avg: "AUD 28,000/yr" },
  { name: "Health Sciences",   avg: "AUD 35,000/yr" },
  { name: "Architecture",      avg: "AUD 33,000/yr" },
],
    costOfLiving: [
  { category: "Rent",                   monthly: "AUD 900–1,400" },
  { category: "Food",                   monthly: "AUD 350–500"   },
  { category: "Transport",              monthly: "AUD 100–160"  },
  { category: "Utilities",              monthly: "AUD 80–120"   },
  { category: "Entertainment",          monthly: "AUD 100–150"  },
],
    visaSteps: [
  { step: "01", title: "Receive your offer letter", desc: "Get a Confirmation of Enrolment (CoE) from an Australian university registered on CRICOS — required to apply for the Student Visa (Subclass 500)." },
  { step: "02", title: "Obtain Overseas Student Health Cover (OSHC)", desc: "Mandatory health insurance for the full duration of your course. Purchase OSHC from an approved provider before your visa application." },
  { step: "03", title: "Apply for Subclass 500 online", desc: "Submit your Student Visa application online via ImmiAccount. Provide GTE statement, financial evidence (AUD 21,041/year), and academic documents." },
  { step: "04", title: "Biometrics and decision", desc: "Attend biometrics at an Australian Visa Application Centre in India. Processing takes 4–8 weeks; visa is granted electronically." },
],
    scholarships: [
  { name: "Australia Awards Scholarship", type: "Full Funding", deadline: "Apr each year", body: "Australia's flagship scholarship program for students from developing countries. Covers full tuition, living stipend, return flights, and health cover." },
  { name: "Destination Australia", type: "Partial — up to AUD 15,000/yr", deadline: "Varies", body: "Government-funded scholarship for international students studying in regional Australia — available across multiple universities and fields." },
  { name: "University of Melbourne Graduate Research Scholarships", type: "Partial — AUD 32,000/yr", deadline: "Oct each year", body: "Prestigious research scholarship covering stipend for eligible PhD and Masters by Research international students." },
],
  },
  "germany": {
    slug: "germany",
    name: "Federal Republic of Germany",
    flag: "🇩🇪",
    metaTitle: "Study in Federal Republic of Germany — Find Abroad",
    metaDescription: "Near-zero tuition at public German universities. National Visa Type D, strong engineering programmes, pathway to EU PR.",
    heroTitle: <>Study in<br />Germany</>,
    heroDescription: `World-class engineering and research at near-zero cost. Germany's public 
            universities offer tuition-free education to international students — 
            an unmatched value proposition.`,
    facts: [
  { label: "Avg Tuition",  value: "Free – EUR 1,000/sem" },
  { label: "Visa Type",    value: "National Visa (Type D)" },
  { label: "Intakes",      value: "Winter (Oct) · Summer (Apr)" },
  { label: "Universities", value: "80+" },
],
    highlights: [
  { num: "01", title: "Near-zero tuition",          body: "Public universities in Germany charge only a semester fee (€150–€350) — no tuition. One of the most affordable quality education systems globally." },
  { num: "02", title: "Engineering & tech hub",     body: "TU Munich, KIT, RWTH Aachen — ranked among the world's best for engineering, computer science, and applied sciences." },
  { num: "03", title: "EU permanent residency",     body: "After 2 years of work post-graduation, you can apply for a German settlement permit — a gateway to EU-wide mobility." },
  { num: "04", title: "Central European location",  body: "Live at the heart of Europe with easy access to 26 Schengen countries for travel, internships, and careers." },
],
    process: [
  { step: "01", label: "Profile Evaluation",    desc: "Academic equivalency check via APS and language requirement planning." },
  { step: "02", label: "University Shortlist",   desc: "Public and private universities matched by field and German/English medium." },
  { step: "03", label: "Application Support",    desc: "Motivation letter, CV in Europass format, and uni-assist submission." },
  { step: "04", label: "Visa Preparation",       desc: "Type D visa, blocked account (Sperrkonto), health insurance guidance." },
],
    topCourses: [
  { name: "Engineering",       avg: "EUR 500–3,000/sem" },
  { name: "Computer Science",  avg: "EUR 500–3,000/sem" },
  { name: "Natural Sciences",  avg: "EUR 0–2,500/sem" },
  { name: "Business",          avg: "EUR 1,500–10,000/sem" },
  { name: "Architecture",      avg: "EUR 500–3,000/sem" },
],
    costOfLiving: [
  { category: "Rent",                    monthly: "EUR 400–900"   },
  { category: "Food",                    monthly: "EUR 200–350"   },
  { category: "Transport (sem ticket)",  monthly: "EUR 100–200/sem" },
  { category: "Health insurance",        monthly: "EUR 110/mo"   },
  { category: "Entertainment",           monthly: "EUR 50–100"   },
],
    visaSteps: [
  { step: "01", title: "APS certificate (India only)", desc: "Indian applicants must obtain an APS (Academic Evaluation Centre) certificate verifying their academic qualifications before applying for a German study visa." },
  { step: "02", title: "Open a blocked account (Sperrkonto)", desc: "Deposit EUR 11,208/year (EUR 934/month) into a German blocked account. Providers include Fintiba and Expatrio. Required as financial proof for the visa." },
  { step: "03", title: "Apply for Type D National Visa", desc: "Submit your visa application at the German Consulate in India. Include university admission letter, APS certificate, health insurance, and blocked account confirmation." },
  { step: "04", title: "Enrol and register at Einwohnermeldeamt", desc: "On arrival, enrol at your university and register your address at the local Einwohnermeldeamt (residents' office) within 14 days to receive your Anmeldebescheinigung." },
],
    scholarships: [
  { name: "DAAD Scholarship", type: "Full Funding", deadline: "Oct–Nov each year", body: "Germany's largest scholarship programme for international students. Covers monthly stipend, travel costs, and health insurance for Masters and PhD study in Germany." },
  { name: "Deutschlandstipendium", type: "Partial — EUR 300/month", deadline: "Varies by university", body: "Merit-based scholarship co-funded by the German government and private sponsors. Available to international students enrolled at German universities." },
  { name: "Humboldt Research Fellowship", type: "Full Funding — PhD & PostDoc", deadline: "Rolling", body: "For highly qualified international researchers at PhD or postdoctoral level. Covers living expenses and research costs for study in Germany." },
],
  },
  "ireland": {
    slug: "ireland",
    name: "Republic of Ireland",
    flag: "🇮🇪",
    metaTitle: "Study in Republic of Ireland — Find Abroad",
    metaDescription: "Explore 30+ Irish universities. Study Visa, 1-2 year stay-back option, and strong industry connections in Europe.",
    heroTitle: <>Study in<br />Ireland</>,
    heroDescription: `A fast-growing destination for international students with strong industry
            links, English-medium education, and attractive post-study work options.`,
    facts: [
  { label: "Avg Tuition", value: "EUR 10,000–25,000" },
  { label: "Visa Type", value: "Study Visa" },
  { label: "Intakes", value: "Sep · Jan" },
  { label: "Universities", value: "30+" },
],
    highlights: [
  { num: "01", title: "English-speaking EU destination", body: "Ireland offers globally recognized degrees in an English-speaking environment with direct access to the wider European market." },
  { num: "02", title: "Stay-back opportunity", body: "The Third Level Graduate Programme allows eligible graduates to remain and work in Ireland for up to 2 years." },
  { num: "03", title: "Global tech ecosystem", body: "Dublin hosts major offices of Google, Meta, Microsoft, and many high-growth startups, creating strong career exposure." },
  { num: "04", title: "Compact, student-friendly system", body: "High-quality institutions, shorter travel times, and welcoming communities make Ireland easy to adapt to." },
],
    process: [
  { step: "01", label: "Profile Evaluation", desc: "Program fit analysis based on academics, budget, and career goals." },
  { step: "02", label: "University Shortlist", desc: "Balanced shortlist across top universities and high-ROI institutions." },
  { step: "03", label: "Application Support", desc: "SOP editing, references, and complete application submission support." },
  { step: "04", label: "Visa Preparation", desc: "Study Visa checklist, financial proof guidance, and interview readiness." },
],
    topCourses: [
  { name: "Computer Science",   avg: "EUR 12,000/yr" },
  { name: "MBA",                avg: "EUR 18,000/yr" },
  { name: "Engineering",        avg: "EUR 14,000/yr" },
  { name: "Pharmacy & Health",  avg: "EUR 16,000/yr" },
  { name: "Data Analytics",     avg: "EUR 13,000/yr" },
  { name: "Business Studies",   avg: "EUR 11,000/yr" },
],
    costOfLiving: [
  { category: "Rent (shared room, Dublin)", monthly: "EUR 800–1,200" },
  { category: "Food & groceries",           monthly: "EUR 250–400"   },
  { category: "Transport (Leap Card)",      monthly: "EUR 80–120"   },
  { category: "Utilities",                  monthly: "EUR 60–90"    },
  { category: "Entertainment",              monthly: "EUR 80–150"   },
],
    visaSteps: [
  { step: "01", title: "Receive offer letter from Irish institution", desc: "Obtain an unconditional letter of acceptance from a recognised Irish higher education institution before applying for a Study Visa." },
  { step: "02", title: "Financial evidence", desc: "Show sufficient funds: EUR 7,000 minimum for the first year of study (EUR 500–700/month for accommodation + course fees). Bank statements for 6 months required." },
  { step: "03", title: "Apply for Irish Study Visa (D Study)", desc: "Apply online via the AVATS system. Required documents include offer letter, financial proof, medical insurance, and passport-sized photos." },
  { step: "04", title: "Register with GNIB on arrival", desc: "Within 90 days of arrival, register with the Garda National Immigration Bureau (GNIB) to get your Irish Residence Permit (IRP) card." },
],
    scholarships: [
  { name: "Government of Ireland International Education Scholarship", type: "Full Funding — EUR 10,000", deadline: "Mar each year", body: "Awarded to exceptional international students from non-EEA countries. Covers EUR 10,000 stipend towards tuition and living costs for 1 year." },
  { name: "Trinity College Dublin Global Excellence Scholarships", type: "Partial — up to EUR 5,000", deadline: "With application", body: "Merit-based scholarship for incoming international students at TCD across undergraduate and postgraduate programmes." },
  { name: "UCD Global Excellence Scholarships", type: "Partial — 25% tuition fee", deadline: "With application", body: "University College Dublin offers automatic merit scholarships to high-achieving international students in select programmes." },
],
  },
  "france": {
    slug: "france",
    name: "Republic of France",
    flag: "🇫🇷",
    metaTitle: "Study in Republic of France — Find Abroad",
    metaDescription: "Explore 50+ French universities and Grandes Écoles. Campus France procedure, Eiffel scholarships, and affordable tuition.",
    heroTitle: <>Study in<br />France</>,
    heroDescription: `A world-class destination with affordable public universities, prestigious
            Grandes Écoles, and a straightforward Campus France admission pathway.`,
    facts: [
  { label: "Avg Tuition", value: "EUR 3,000–15,000" },
  { label: "Visa Type", value: "VLS-TS Student Visa" },
  { label: "Intakes", value: "Sep · Jan" },
  { label: "Universities", value: "50+" },
],
    highlights: [
  { num: "01", title: "Affordable public universities", body: "Most public French universities charge under EUR 4,000/year — a fraction of UK or US costs for equivalent academic quality." },
  { num: "02", title: "Prestigious Grandes Écoles", body: "France's elite engineering and business schools — École Polytechnique, HEC Paris, ESSEC — are globally ranked and highly respected." },
  { num: "03", title: "Campus France procedure", body: "India has a simplified Campus France process. Our counselors guide you through the CEF procedure, document preparation, and visa application." },
  { num: "04", title: "Post-study work opportunities", body: "France offers a 2-year post-study work permit (APS) allowing graduates to stay and seek employment after completing their degree." },
],
    process: [
  { step: "01", label: "Profile & Language Assessment", desc: "We evaluate your academics, French/English proficiency, and match you to appropriate institutions." },
  { step: "02", label: "Campus France Registration", desc: "Guided support through the CEF online form, university pre-registration, and Skype interview prep." },
  { step: "03", label: "Application & Admission", desc: "Direct application support for Grandes Écoles and public university applications." },
  { step: "04", label: "VLS-TS Visa Preparation", desc: "Complete documentation support: financial proof, accommodation, insurance, and OFII registration guidance after arrival." },
],
    topCourses: [
  { name: "Computer Science",  avg: "EUR 3,500/yr"  },
  { name: "MBA (HEC Paris)",   avg: "EUR 35,000/yr" },
  { name: "Engineering",       avg: "EUR 4,000/yr"  },
  { name: "Fashion & Design",  avg: "EUR 12,000/yr" },
  { name: "Business Studies",  avg: "EUR 4,500/yr"  },
  { name: "Data Science",      avg: "EUR 5,000/yr"  },
],
    costOfLiving: [
  { category: "Rent (CROUS dorm)",      monthly: "EUR 200–600"   },
  { category: "Food & groceries",       monthly: "EUR 250–400"   },
  { category: "Transport (Navigo pass)", monthly: "EUR 50–90"    },
  { category: "Health insurance (CPAM)",monthly: "EUR 0–60"     },
  { category: "Entertainment",          monthly: "EUR 80–150"   },
],
    visaSteps: [
  { step: "01", title: "Campus France registration", desc: "Indian students must register on the Campus France India portal (CEF procedure), fill the pre-registration form, and book a Skype interview with the Campus France office." },
  { step: "02", title: "University pre-registration & admission", desc: "Apply directly to your chosen French institution. For public universities, apply via Parcoursup (undergraduate) or MonMaster (postgraduate). Obtain your acceptance letter." },
  { step: "03", title: "Apply for VLS-TS Student Visa", desc: "Apply at the French Consulate in India with your Campus France attestation, acceptance letter, proof of accommodation, financial means (EUR 615/month), and health insurance." },
  { step: "04", title: "OFII validation on arrival", desc: "Within 3 months of arrival, validate your long-stay visa online with OFII (Office Français de l'Immigration et de l'Intégration) and attend a medical appointment." },
],
    scholarships: [
  { name: "Eiffel Excellence Scholarship", type: "Full Funding", deadline: "Jan each year", body: "French Ministry for Europe & Foreign Affairs scholarship for outstanding international Masters and PhD students. Covers monthly stipend, accommodation, and travel." },
  { name: "Erasmus+ Scholarships", type: "Partial — EUR 700–1,000/month", deadline: "Varies by programme", body: "EU-funded mobility grants for students enrolled in joint Erasmus Mundus masters programmes at European universities, including those in France." },
  { name: "French Government Excellence Scholarships (BGF)", type: "Partial Funding", deadline: "Mar each year", body: "Embassy of France in India awards partial scholarships to top Indian students for Masters programmes at French institutions." },
],
  },
  "new-zealand": {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    metaTitle: "Study in New Zealand — Find Abroad",
    metaDescription: "Explore top New Zealand universities — University of Auckland, Otago, Victoria. 3-year post-study work visa and world-class research.",
    heroTitle: <>Study in<br />New Zealand</>,
    heroDescription: `A safe, English-speaking destination with generous post-study work rights,
            world-class research universities, and a high quality of life.`,
    facts: [
  { label: "Avg Tuition", value: "NZD 22,000–40,000" },
  { label: "Visa Type", value: "Student Visa" },
  { label: "Intakes", value: "Feb · Jul" },
  { label: "Universities", value: "20+" },
],
    highlights: [
  { num: "01", title: "3-year post-study work visa", body: "New Zealand offers one of the most generous post-study work rights — a 3-year open work visa after completing a qualification of 30+ weeks." },
  { num: "02", title: "Safe, English-speaking destination", body: "Consistently ranked among the safest countries globally, NZ offers a welcoming environment and high quality of life for international students." },
  { num: "03", title: "Affordable vs UK and Australia", body: "Tuition and living costs in New Zealand are significantly lower than comparable English-speaking destinations, with excellent return on investment." },
  { num: "04", title: "Strong research and tech programs", body: "Leading universities in agriculture, environmental science, engineering, and computer science — with strong industry ties and research funding." },
],
    process: [
  { step: "01", label: "Profile Evaluation", desc: "Assessing your academics, English scores (IELTS 6.0+), and career goals for NZ fit." },
  { step: "02", label: "University Shortlist", desc: "Selecting from University of Auckland, Otago, Victoria, Canterbury, AUT, Massey based on your profile." },
  { step: "03", label: "Application Support", desc: "Application forms, personal statement, and reference letters for NZ institutions." },
  { step: "04", label: "Student Visa Preparation", desc: "Offer of Place, proof of funds (NZD 15,000/year), medical insurance, and NZeTA if required." },
],
    topCourses: [
  { name: "Computer Science",   avg: "NZD 30,000/yr" },
  { name: "Engineering",        avg: "NZD 32,000/yr" },
  { name: "MBA",                avg: "NZD 40,000/yr" },
  { name: "Agriculture & Env",  avg: "NZD 28,000/yr" },
  { name: "Business Studies",   avg: "NZD 26,000/yr" },
  { name: "Health Sciences",    avg: "NZD 35,000/yr" },
],
    costOfLiving: [
  { category: "Rent (shared room)",      monthly: "NZD 700–1,200" },
  { category: "Food & groceries",        monthly: "NZD 350–500"   },
  { category: "Transport (monthly pass)", monthly: "NZD 120–200" },
  { category: "Utilities",               monthly: "NZD 80–130"   },
  { category: "Entertainment",           monthly: "NZD 100–200"  },
],
    visaSteps: [
  { step: "01", title: "Receive Offer of Place", desc: "Obtain an unconditional offer of place from a New Zealand institution approved by Immigration New Zealand (INZ) before applying for a student visa." },
  { step: "02", title: "Financial evidence", desc: "Prove you have NZD 15,000 per year for living costs, plus full tuition fees. Provide 3–6 months of bank statements, ITR, or a sponsorship letter." },
  { step: "03", title: "Apply for Student Visa (online)", desc: "Apply via the Immigration New Zealand online portal. Required documents include offer letter, financial proof, medical and travel insurance, and a medical certificate if required." },
  { step: "04", title: "NZeTA (if applicable) and arrival", desc: "Indian passport holders need a visa to enter NZ — no NZeTA required separately. On arrival, your visa is confirmed at the border. You may work up to 20 hours/week on a student visa." },
],
    scholarships: [
  { name: "New Zealand Excellence Awards (NZEA)", type: "Partial — up to NZD 10,000", deadline: "Varies by institution", body: "Partnership scholarship between Education New Zealand and participating universities. Covers a partial tuition fee waiver for Indian students." },
  { name: "New Zealand Development Scholarships", type: "Full Funding", deadline: "Mar each year", body: "New Zealand government scholarship for students from eligible developing countries. Covers tuition, living allowance, and return travel." },
  { name: "University of Auckland International Student Excellence Scholarship", type: "Partial — up to NZD 10,000", deadline: "With application", body: "Merit-based scholarship for high-achieving international students enrolling at the University of Auckland in undergraduate or postgraduate programmes." },
],
  },
};

export const COUNTRIES_LIST = Object.values(COUNTRIES_DATA);
