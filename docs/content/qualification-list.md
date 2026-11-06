# Qualification List

> Source: list supplied by the user, 2026-11-04. Prices and RTO names were removed on purpose and are never published.
> Rule: qualifications that already exist are **skipped for creation and keep their URL**. Their code or title can be corrected later without changing the slug.
> "Code status" is verified on training.gov.au during the content phase.

## A. Already on the site (skip — keep URL)

| User list | Existing course (slug) | Note |
|---|---|---|
| AUR30320 Cert III Automotive Electrical Technology | `aur30320-certificate-iii-in-automotive-electrical-tech` | ⚠ **Duplicate in DB**: also `aur30320-certificate-iii-in-automotive-electrical-technology`. Keep one, 301 the other. |
| AUR30620 Cert III Light Vehicle Mechanical Technology | `aur30620-…` | |
| AUR31120 Cert III Heavy Commercial Vehicle Mechanical Technology | `aur31120-…` | |
| AUR31520 Cert III Automotive Diesel Engine | `aur31520-…` | |
| AUR32120 Cert III Automotive Body Repair Technology | `aur32120-…` | |
| AUR40116 Cert IV Automotive Management | `aur40116-…` | |
| AUR40216 Cert IV Mechanical Diagnosis | `aur40216-…` | |
| AUR40718 Cert IV Automotive Body Repair Technology | `aur40720-…` | The DB has the newer code. |
| AUR40820 Cert IV Automotive Mechanical Overhauling | `aur40820-…` | |
| AUR50216 Diploma of Automotive Technology | `aur50216-…` | |
| BSB40120 Cert IV Business | `certificate-iv-in-business` | |
| BSB41419 Cert IV WHS | `certificate-iv-in-work-health-and-safety` | |
| BSB50420 Diploma of Leadership and Management | `bsb50420-…` | |
| BSB50820 Diploma of Project Management | `bsb50820-…` | |
| CHC30121 Cert III Early Childhood Education and Care | `chc30121-…` | |
| CHC33021 Cert III Individual Support | `chc33021-…` | |
| CHC40221 Cert IV School Based Education Support | `chc40221-…` | |
| CHC40321 Cert IV Child Youth and Family Intervention | `chc40321-cert-iv-in-child-youth-family` | |
| CHC43021 Cert IV Ageing Support | `chc43015-certificate-iv-in-ageing-support` | The DB shows the old code CHC43015. Verify and update the title only. |
| CHC43121 Cert IV Disability Support | `chc43121-…` | |
| CHC43315 Cert IV Mental Health | `chc43315-…` | Verify the code. |
| CHC43415 Cert IV Leisure and Health | `chc43415-…` | Verify the code. |
| CHC50121 Diploma of Early Childhood Education and Care | `chc50121-…` | |
| CHC50421 Diploma of Youth Work | `chc50421-…` | |
| CHC51015 Diploma of Counselling | `chc51015-…` | Verify the code. |
| CHC52021 Diploma of Community Services | `chc52021-…` | |
| CHC53221 Diploma of Alcohol and Other Drugs | `chc53215-…` | The DB shows the old code. Update the title only. |
| CHC53315 Diploma of Mental Health | `chc53315-…` | Verify the code. |
| CHC62015 Advanced Diploma of Community Sector Management | `chc62015-…` | |
| CPC30220 Cert III Carpentry | `cpc30220-…` | |
| CPC30320 Cert III Concreting | `cpc30320-…` | |
| CPC30620 Cert III Painting and Decorating | `cpc30620-…` | |
| CPC31320 Cert III Wall and Floor Tiling | `cpc31320-…` | |
| CPC31411 Cert III Construction Waterproofing | `cpc31420-…` | The DB has the newer code. |
| CPC32420 Cert III Plumbing | `cpc32420-…` | |
| CPC32620 Cert III Roof Plumbing | `cpc32620-…` | |
| CPC33020 Cert III Bricklaying | `cpc33020-…` | |
| CPC40110 Cert IV Building and Construction | `cpc40120-…` | The DB has the newer code. |
| CPC40920 Cert IV Plumbing and Services | `cpc40920-…` | |
| CPC50220 Diploma of Building and Construction | `cpc50220-…` | |
| CPP20218 Cert II Security Operations | `certificate-ii-in-security-operations` | |
| CPP40719 Cert IV Security and Management | `certificate-iv-in-security-and-management` | |
| CPP41419 Cert IV Real Estate Practice | `cpp41419-…` | |
| CPP41519 Cert IV Security Risk Analysis | `certificate-iv-in-security-risk-analysis` | |
| CPP50619 Diploma of Security and Risk Management | `diploma-of-security-and-risk-management` | |
| CPP51119 Diploma of Property (Agency Management) | `diploma-of-property-agency-management` | The DB has CPP51122. |
| FNS40217 Cert IV Accounting and Bookkeeping | `fns40222-…` | The DB has the newer code. |
| FNS50217 Diploma of Accounting | `fns50222-…` | The DB has the newer code. |
| HLT37315 Cert III Health Administration | `hlt37315-…` | |
| HLT42021 Cert IV Massage Therapy | `hlt42021-…` | |
| HLT43021 Cert IV Allied Health Assistance | `hlt43021-…` | |
| HLT52021 Diploma of Remedial Massage | `hlt52021-…` | |
| MEM30219 Cert III Engineering – Mechanical Trade | `mem30219-…` | |
| MEM30319 Cert III Engineering – Fabrication Trade | `mem31922-…` | The DB has the newer code. |
| SHB30416 Cert III Hairdressing | `shb30416-…` | Verify the code (may be superseded). |
| SIT30821 Cert III Commercial Cookery | `sit30821-…` | |
| SIT40521 Cert IV Kitchen Management | `sit40521-…` | |
| SIT50422 Diploma of Hospitality Management | `sit50422-…` | |
| TAE40122 Cert IV Training and Assessment | `tae40122-…` | |
| UEE30811 Cert III Electrotechnology Electrician | `uee30820-…` | The list has the old code. The DB has the current one. |
| UEE32220 Cert III Air Conditioning and Refrigeration | `uee32225-…` | The list has the old code. The DB has the current one. |

**On the site but not in your list** (keep them, just noting): AUR20220 Cert II Automotive Air Conditioning, AUR40620 Cert IV Automotive Electrical, CPP31318 Cert III Security Operations, HLTAID011 First Aid, HLTAID009 CPR.

## B. New qualifications to create (64)

> **Done 2026-11-06: 59 courses created as DRAFT** (content in `docs/content/courses/*.json`, entries with `code` + `section`; written with `scripts/import-course-content.mts --new-only --write`). Codes were checked on training.gov.au and the **current** code is used, so the 64 below became 59:
> - TAE50116 and TAE50216 → one page, **TAE50122** Diploma of Vocational Education and Training
> - ICT50915 → ICT50220 and ICT60120 → ICT60220 (both already in the list); ICT40815 → **ICT40120** Certificate IV in Information Technology
> - TLI40319 and TLI40321 → one page, **TLI40324**; TLI30321 → **TLI30325**
> - SHB50115 → SHB50121, which was already on the site (skipped)
> - Other renames: CPC10120→CPC10126, Demolition = CPC30420→**CPC30426**, MSF30413→MSF30422, MSF31113→**MSF30322** (Cabinet Making and Timber Technology), RII30820→RII30826, FNS40820→FNS40821, FNS50320→FNS50322, FNS60217→FNS60222, SIT31116→SIT31121, SIT40816→SIT40821, FBP30517→FBP30521, AMP40415→**AMP40222** (Certificate IV in Meat Processing), SHB40115→SHB40121, AHC30716→AHC30722, AHC30916→AHC30921, AHC40410→AHC40422, CUA31120→CUA31125, CUA40720→CUA40725, SIT20116→SIT20125, SIT30216→SIT30222, SIT40116→SIT40125, SIT50116→SIT50122
>
> Moved: FNS40222 and FNS50222 → `finance-and-accounting`; SHB30416 → `hairdressing-and-beauty` (its URLs are unchanged). The 6 new sections exist; a section only appears on the site once it has a published course. New courses have no image of their own and show their section's cover (CC0 photos in `public/images/sections/`, see `docs/content/section-images.md`).
>
> **Still for the user to check before publishing:** durations, licensing notes (demolition, plastering, joinery, cabinet making and glazing licences in QLD/NSW, structural landscaping, mortgage broking ASIC/MFAA/FBAA rules, TPB for accounting), and work placement hours (CHC30221 100 h, HLT33115 80 h, HLT52215/HLT52615 200 h). Publish from Admin → Courses (bulk "Publish"), then press "Refresh public cache".

Codes are verified (current or superseded) during research. If a code is superseded, the page uses the **current** code and mentions the old one.

### Construction & Plumbing — existing section `construction-and-plumbing` (8)
- CPC10120 Certificate I in Construction
- Certificate III in Demolition *(code to confirm)*
- CPC31220 Certificate III in Wall and Ceiling Lining
- CPC31920 Certificate III in Joinery
- CPC41020 Certificate IV in Demolition
- MSF30413 Certificate III in Glass and Glazing
- MSF31113 Certificate III in Cabinet Making
- RII30820 Certificate III in Civil Construction Plant Operations

### Community Service — existing section `community-service` (1)
- CHC30221 Certificate III in School Based Education Support

### Health Care — existing section `health-care` (3)
- HLT33115 Certificate III in Health Services Assistance
- HLT52215 Diploma of Shiatsu and Oriental Therapies
- HLT52615 Diploma of Ayurvedic Lifestyle Consultation

### Business & Training — existing section `business-and-training` (16)
- BSB40420 Certificate IV in Human Resources
- BSB40520 Certificate IV in Leadership and Management
- BSB50120 Diploma of Business
- BSB50620 Diploma of Marketing and Communication
- BSB50920 Diploma of Quality Auditing
- BSB51319 Diploma of Work Health and Safety
- BSB60120 Advanced Diploma of Business
- BSB60420 Advanced Diploma of Leadership and Management
- BSB60520 Advanced Diploma of Marketing and Communication
- BSB60619 Advanced Diploma of Work Health and Safety
- BSB60720 Advanced Diploma of Program Management
- BSB80120 Graduate Diploma of Management (Learning)
- BSB80220 Graduate Diploma of Portfolio Management
- BSB80320 Graduate Diploma of Strategic Leadership
- TAE50116 Diploma of Vocational Education and Training
- TAE50216 Diploma of Training Design and Development

### NEW section: Finance & Accounting — `finance-and-accounting` (3)
*(Existing FNS40222 and FNS50222 move here. Course URLs don't contain the section, so they don't change.)*
- FNS40820 Certificate IV in Finance and Mortgage Broking
- FNS50320 Diploma of Finance and Mortgage Broking Management
- FNS60217 Advanced Diploma of Accounting

### Commercial Cookery & Hospitality — existing section `commercial-cookery-hospitality` (8)
- SIT31021 Certificate III in Patisserie
- SIT31116 Certificate III in Asian Cookery
- SIT40721 Certificate IV in Patisserie
- SIT40816 Certificate IV in Asian Cookery
- SIT60322 Advanced Diploma of Hospitality Management
- FBP30517 Certificate III in Baking
- AMP30815 Certificate III in Meat Processing (Retail Butcher)
- AMP40415 Certificate IV in Meat Processing (Quality Assurance)

### NEW section: Hair & Beauty — `hair-and-beauty` (4)
*(Existing SHB30416 Hairdressing moves here from Health Care. Its URL is unchanged.)*
- SHB30321 Certificate III in Nail Technology
- SHB40115 Certificate IV in Beauty Therapy
- SHB50115 Diploma of Beauty Therapy
- SHB50216 Diploma of Salon Management

### NEW section: Horticulture & Landscaping — `horticulture-and-landscaping` (3)
- AHC30716 Certificate III in Horticulture
- AHC30916 Certificate III in Landscape Construction
- AHC40410 Certificate IV in Horticulture

### NEW section: Information Technology — `information-technology` (5)
- ICT40815 Certificate IV in Digital Media Technologies
- ICT50220 Diploma of Information Technology
- ICT50915 Diploma of Digital Media Technologies
- ICT60120 Advanced Diploma of Information Technology
- ICT60220 Advanced Diploma of Information Technology (Security Networking)

### NEW section: Creative Arts & Design — `creative-arts-and-design` (4)
- CUA30720 Certificate III in Design Fundamentals
- CUA31120 Certificate III in Visual Arts
- CUA40720 Certificate IV in Design
- CUA41320 Certificate IV in Visual Arts

### NEW section: Retail, Travel & Tourism — `retail-travel-and-tourism` (6)
- SIR30216 Certificate III in Retail
- SIR40316 Certificate IV in Retail
- SIT20116 Certificate II in Tourism
- SIT30216 Certificate III in Travel
- SIT40116 Certificate IV in Travel and Tourism
- SIT50116 Diploma of Travel and Tourism Management

### NEW section: Logistics & Supply Chain — `logistics-and-supply-chain` (3)
- TLI30321 Certificate III in Supply Chain Operations
- TLI40319 Certificate IV in Logistics
- TLI40321 Certificate IV in Supply Chain Operations
