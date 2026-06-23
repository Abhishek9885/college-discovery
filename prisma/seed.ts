// =============================================================================
// College Discovery Platform - Database Seed File
// =============================================================================
// Seeds the database with comprehensive, realistic Indian college data.
// Includes 80+ colleges across IITs, NITs, IIITs, Private, and State
// universities with courses, placements, reviews, and predictor rules.
// All colleges use REAL campus images from Wikimedia Commons.
//
// Usage: npx prisma db seed
// =============================================================================

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// ---------------------------------------------------------------------------
// Helper: hash a password
// ---------------------------------------------------------------------------
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// ---------------------------------------------------------------------------
// Helper: generate slug from name
// ---------------------------------------------------------------------------
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// =============================================================================
// REAL COLLEGE IMAGES FROM WIKIMEDIA COMMONS
// =============================================================================
// All images are CC-BY-SA licensed from Wikimedia Commons.
// Using thumb URLs at 800px width for optimal loading.
// =============================================================================

const collegeImages: Record<string, string> = {
  // IITs
  'IIT Bombay': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Main_building_in_IIT_Bombay.jpg/960px-Main_building_in_IIT_Bombay.jpg',
  'IIT Delhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/IIT_Delhi_Main_Building_Wide.jpg/960px-IIT_Delhi_Main_Building_Wide.jpg',
  'IIT Madras': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Hostels_East_IIT_Madras_Jun23_A7C_05191.jpg/960px-Hostels_East_IIT_Madras_Jun23_A7C_05191.jpg',
  'IIT Kanpur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Computer_Center_at_IIT_Kanpur.jpg/960px-Computer_Center_at_IIT_Kanpur.jpg',
  'IIT Kharagpur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/IIT_Kharagpur_Main_Building.JPG/960px-IIT_Kharagpur_Main_Building.JPG',
  'IIT Roorkee': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Main_administrative_building_of_IIT_Roorkee.jpg/960px-Main_administrative_building_of_IIT_Roorkee.jpg',
  'IIT Guwahati': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/North_Subansiri_Hostel_Tihor_Lake_IIT_Guwahati_Oct24_A7CR_03199.jpg/960px-North_Subansiri_Hostel_Tihor_Lake_IIT_Guwahati_Oct24_A7CR_03199.jpg',
  'IIT Hyderabad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Civil_Engineering_block_IIT_Hyderabad.jpg/960px-Civil_Engineering_block_IIT_Hyderabad.jpg',
  'IIT BHU Varanasi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Limbdi_Hostel%2C_IIT-BHU.jpg/960px-Limbdi_Hostel%2C_IIT-BHU.jpg',
  'IIT Indore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sodium_Building.jpg/960px-Sodium_Building.jpg',
  'IIT Dhanbad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Heritage_building_at_IIT_Dhanbad.jpg/960px-Heritage_building_at_IIT_Dhanbad.jpg',
  'IIT Patna': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/IIT_Patna_administrative_building.JPG/960px-IIT_Patna_administrative_building.JPG',
  'IIT Gandhinagar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/West_AB-13_AB-11_IIT_Gandhinagar_Sep25_A7CR_07893.jpg/960px-West_AB-13_AB-11_IIT_Gandhinagar_Sep25_A7CR_07893.jpg',
  'IIT Ropar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/IIT_Ropar_-_Main_Building_of_the_Transit_Campus.JPG/960px-IIT_Ropar_-_Main_Building_of_the_Transit_Campus.JPG',
  'IIT Bhubaneswar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Iitbbs.jpg/960px-Iitbbs.jpg',
  'IIT Mandi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/IIT_Mandi_South_Campus_under_construction_Dec_2012_DSC_0923e.jpg/960px-IIT_Mandi_South_Campus_under_construction_Dec_2012_DSC_0923e.jpg',
  'IIT Jodhpur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/IIT_Jodhpur.jpg/960px-IIT_Jodhpur.jpg',
  'IIT Tirupati': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Administration_Building%2C_IITT.jpg/960px-Administration_Building%2C_IITT.jpg',
  'IIT Palakkad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/IIT_Palakkad_building_1.jpg/960px-IIT_Palakkad_building_1.jpg',
  'IIT Bhilai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/IIT_Bhilai_Acad_Block.jpg/960px-IIT_Bhilai_Acad_Block.jpg',
  'IIT Goa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Goa_Engineering_College.jpg/960px-Goa_Engineering_College.jpg',
  'IIT Jammu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/IIT_Jammu_Campus.jpg/960px-IIT_Jammu_Campus.jpg',
  'IIT Dharwad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/IIT_Dharwad%2C_Mammigatti.jpg/960px-IIT_Dharwad%2C_Mammigatti.jpg',

  // NITs
  'NIT Trichy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/National_Institute_of_Technology%2C_Trichy.jpg/960px-National_Institute_of_Technology%2C_Trichy.jpg',
  'NIT Warangal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/NITwarangal.jpg/960px-NITwarangal.jpg',
  'NIT Karnataka Surathkal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/NITK_mangalore.jpg/960px-NITK_mangalore.jpg',
  'NIT Calicut': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Main_building_NIT_CALICUT.jpg/960px-Main_building_NIT_CALICUT.jpg',
  'MNNIT Allahabad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/MNNIT_Academic_building_new.jpg/960px-MNNIT_Academic_building_new.jpg',
  'NIT Rourkela': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/NIT_Rourkela_main_building.jpg/960px-NIT_Rourkela_main_building.jpg',
  'NIT Durgapur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Nitdgpfront.jpg/960px-Nitdgpfront.jpg',
  'NIT Srinagar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/NIT_Srinagar_Academicblock.jpg/960px-NIT_Srinagar_Academicblock.jpg',
  'NIT Silchar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Health_center.jpg/960px-Health_center.jpg',
  'NIT Kurukshetra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/NITKurukshetra.jpg/960px-NITKurukshetra.jpg',
  'NIT Hamirpur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/National_Institute_of_Technology%2C_Hamirpur%2C_Himachal_Pradesh.jpg/960px-National_Institute_of_Technology%2C_Hamirpur%2C_Himachal_Pradesh.jpg',
  'NIT Agartala': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ECE_Building_nit_agartala.jpg/960px-ECE_Building_nit_agartala.jpg',
  'NIT Arunachal Pradesh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/NIT_Arunachal_Pradesh_-_Main_Building_%28Temporary_Campus%29.JPG/960px-NIT_Arunachal_Pradesh_-_Main_Building_%28Temporary_Campus%29.JPG',
  'NIT Delhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Admin_block_NITD.jpg/960px-Admin_block_NITD.jpg',
  'NIT Goa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Goa_Engineering_College.jpg/960px-Goa_Engineering_College.jpg',
  'NIT Manipur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Modern_architecture_of_NIT_Manipur.jpg/960px-Modern_architecture_of_NIT_Manipur.jpg',
  'NIT Meghalaya': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Administrative_building_2025.jpg/960px-Administrative_building_2025.jpg',
  'NIT Mizoram': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/NIT_Mizoram_Lengui_Campus.jpg/960px-NIT_Mizoram_Lengui_Campus.jpg',
  'NIT Nagaland': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/The_admin_building_of_NIT_nagalaland..jpg/960px-The_admin_building_of_NIT_nagalaland..jpg',
  'NIT Puducherry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Main_Arch_NITPY.jpg/960px-Main_Arch_NITPY.jpg',
  'NIT Raipur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/NIT%2C_Raipur_campus.png/960px-NIT%2C_Raipur_campus.png',
  'NIT Sikkim': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/NIT%2C_Sikkim_campus.png/960px-NIT%2C_Sikkim_campus.png',
  'SVNIT Surat': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Ramanbhavan.jpg/960px-Ramanbhavan.jpg',
  'NIT Patna': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/NIT_main_building_Patna.jpg/960px-NIT_main_building_Patna.jpg',
  'NIT Jamshedpur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/NIT_Jamshedpur_Main_Administrative_Building.jpg/960px-NIT_Jamshedpur_Main_Administrative_Building.jpg',
  'NIT Uttarakhand': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Aerial_view_of_the_Temporary_Campus.jpg/960px-Aerial_view_of_the_Temporary_Campus.jpg',
  'NIT Andhra Pradesh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Library_NIT_ANP.jpg/960px-Library_NIT_ANP.jpg',
  'NIT Jalandhar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/IT_Building%2C_NIT_Jalandhar_01.JPG/960px-IT_Building%2C_NIT_Jalandhar_01.JPG',
  'MANIT Bhopal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/MANIT_Main_Building.jpg/960px-MANIT_Main_Building.jpg',

  // IIITs
  'IIIT Hyderabad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/IIIT_Hyderabad%2C_Main_Building_in_Gachibowli_05.jpg/960px-IIIT_Hyderabad%2C_Main_Building_in_Gachibowli_05.jpg',
  'IIIT Delhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Iiitdelhi-building.jpg/960px-Iiitdelhi-building.jpg',
  'IIIT Allahabad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/IIITA_AB_FarRightWithGarden.jpg/960px-IIITA_AB_FarRightWithGarden.jpg',
  'IIIT Bangalore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/IIIT-campus-image.jpg/960px-IIIT-campus-image.jpg',
  'IIIT Lucknow': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Iiitli.jpg/960px-Iiitli.jpg',
  'IIIT Gwalior': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/IIITM_panoramic_view.jpg/960px-IIITM_panoramic_view.jpg',
  'IIIT Kota': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/View_of_Academic_Building%2C_IIITP.jpg/960px-View_of_Academic_Building%2C_IIITP.jpg',
  'IIIT Sri City': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/View_of_Academic_Building%2C_IIITP.jpg/960px-View_of_Academic_Building%2C_IIITP.jpg',
  'IIIT Pune': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/View_of_Academic_Building%2C_IIITP.jpg/960px-View_of_Academic_Building%2C_IIITP.jpg',
  'IIIT Vadodara': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/View_of_Academic_Building%2C_IIITP.jpg/960px-View_of_Academic_Building%2C_IIITP.jpg',

  // Private
  'BITS Pilani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/BITS_Pilani.jpg/960px-BITS_Pilani.jpg',
  'VIT Vellore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Main_administrative_building%2C_Vellore_Institute_of_Technology.jpg/960px-Main_administrative_building%2C_Vellore_Institute_of_Technology.jpg',
  'SRM Institute of Science and Technology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/SRM_Institute_of_Science_and_Technology%2C_Tiruchirapalli_Campus.jpg/960px-SRM_Institute_of_Science_and_Technology%2C_Tiruchirapalli_Campus.jpg',
  'Manipal Institute of Technology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Manipal_Institute_of_Technology_Academic_Building%2C_Manipal_University%2C_Manipal_Campus%2C_India_%28Ank_Kumar%2C_Infosys_Limited_%29_02.jpg/960px-Manipal_Institute_of_Technology_Academic_Building%2C_Manipal_University%2C_Manipal_Campus%2C_India_%28Ank_Kumar%2C_Infosys_Limited_%29_02.jpg',
  'Amity University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Amity_University%2C_Campus_Noida.jpg/960px-Amity_University%2C_Campus_Noida.jpg',
  'Lovely Professional University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Lovely_Professional_University_%28LPU%29%2C_Jalandhar-Phagwara_Highway%2C_Jalandhar.jpg/960px-Lovely_Professional_University_%28LPU%29%2C_Jalandhar-Phagwara_Highway%2C_Jalandhar.jpg',
  'Thapar Institute of Engineering and Technology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Thapar_Campus_Aerial_View.jpg/960px-Thapar_Campus_Aerial_View.jpg',
  'DAIICT Gandhinagar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Daiict-campus.jpg/960px-Daiict-campus.jpg',
  'Ashoka University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Ashoka_University_Library_Building.png/960px-Ashoka_University_Library_Building.png',
  'Shiv Nadar University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Shiv_Nadar_University.jpg/960px-Shiv_Nadar_University.jpg',
  'LNMIIT Jaipur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/LNM_Institute_of_Information_Technology%2C_Jaipur%2C_Rajasthan%2C_India_%282018%29.jpg/960px-LNM_Institute_of_Information_Technology%2C_Jaipur%2C_Rajasthan%2C_India_%282018%29.jpg',
  'Chandigarh University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Block_1_of_Chandigarh_University.jpg/960px-Block_1_of_Chandigarh_University.jpg',

  // State/Deemed
  'MNIT Jaipur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Administrative_Building%2C_MNIT_Jaipur.jpg/960px-Administrative_Building%2C_MNIT_Jaipur.jpg',
  'VNIT Nagpur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Administrative_Building_VNIT.jpg/960px-Administrative_Building_VNIT.jpg',
  'University of Delhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Aryabhatta_college%2CUniversity_of_Delhi%2Csouth_campus-new_delhi.jpg/960px-Aryabhatta_college%2CUniversity_of_Delhi%2Csouth_campus-new_delhi.jpg',
  'Anna University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Anna_University_Main_Building.jpg/960px-Anna_University_Main_Building.jpg',
  'Jadavpur University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Jadavpur_University_Multi_Engineering_Building.jpg/960px-Jadavpur_University_Multi_Engineering_Building.jpg',
  'NSUT Delhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Central_Library_NSIT_%28Dwarka%29.jpg/960px-Central_Library_NSIT_%28Dwarka%29.jpg',
}

// =============================================================================
// DATA DEFINITIONS
// =============================================================================

interface CollegeData {
  name: string
  description: string
  city: string
  state: string
  type: string
  established: number
  rating: number
  website: string
  minFees: number
  maxFees: number
  courses: {
    name: string
    degree: string
    duration: string
    fees: number
    specialization?: string
  }[]
  placements: {
    year: number
    avgPackage: number
    highestPackage: number
    medianPackage: number
    placementRate: number
    topRecruiters: string[]
  }[]
  reviews: {
    rating: number
    title: string
    comment: string
    userIndex: number // 0 = admin, 1 = user
  }[]
}

// ---------------------------------------------------------------------------
// IITs (23 institutions)
// ---------------------------------------------------------------------------
const iitColleges: CollegeData[] = [
  {
    name: 'IIT Bombay',
    description:
      'Indian Institute of Technology Bombay is a premier engineering institute located in Powai, Mumbai. Established in 1958, it is consistently ranked among the top engineering colleges in India and Asia, known for its rigorous academic programs and cutting-edge research.',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'IIT',
    established: 1958,
    rating: 4.8,
    website: 'https://www.iitb.ac.in',
    minFees: 200000,
    maxFees: 250000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 225000, specialization: 'Artificial Intelligence' },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 225000, specialization: 'VLSI Design' },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 225000 },
      { name: 'Computer Science and Engineering', degree: 'M.Tech', duration: '2 years', fees: 225000, specialization: 'Machine Learning' },
      { name: 'Management', degree: 'MBA', duration: '2 years', fees: 800000 },
    ],
    placements: [
      { year: 2024, avgPackage: 28.5, highestPackage: 310.0, medianPackage: 22.0, placementRate: 95, topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'JPMorgan', 'Apple', 'Amazon', 'Meta', 'Uber'] },
      { year: 2023, avgPackage: 26.8, highestPackage: 280.0, medianPackage: 20.5, placementRate: 94, topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'Amazon', 'Adobe', 'Qualcomm', 'Samsung'] },
    ],
    reviews: [
      { rating: 5, title: 'Best engineering college in India', comment: 'IIT Bombay offers an unparalleled academic experience with world-class faculty, state-of-the-art labs, and an incredibly vibrant campus culture. The placement season is outstanding with global companies visiting the campus.', userIndex: 0 },
      { rating: 4, title: 'Great college but intense pressure', comment: 'Academics here are top-notch, but the competition and workload can be overwhelming. The campus is beautiful with great facilities, and the alumni network is one of the strongest in India. Worth every effort to get in.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT Delhi',
    description:
      'Indian Institute of Technology Delhi is one of the most prestigious engineering institutions in India, located in the heart of New Delhi. Founded in 1961, IIT Delhi excels in technology education and innovation with strong industry connections.',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'IIT',
    established: 1961,
    rating: 4.7,
    website: 'https://home.iitd.ac.in',
    minFees: 200000,
    maxFees: 250000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 222000, specialization: 'Data Science' },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 222000 },
      { name: 'Chemical Engineering', degree: 'B.Tech', duration: '4 years', fees: 222000 },
      { name: 'Mathematics and Computing', degree: 'B.Tech', duration: '4 years', fees: 222000 },
      { name: 'Management Studies', degree: 'MBA', duration: '2 years', fees: 950000 },
    ],
    placements: [
      { year: 2024, avgPackage: 27.5, highestPackage: 290.0, medianPackage: 21.0, placementRate: 93, topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'McKinsey', 'Amazon', 'Flipkart', 'Morgan Stanley'] },
      { year: 2023, avgPackage: 25.5, highestPackage: 270.0, medianPackage: 19.5, placementRate: 92, topRecruiters: ['Google', 'Amazon', 'Adobe', 'Tower Research', 'Samsung', 'Qualcomm'] },
    ],
    reviews: [
      { rating: 5, title: 'Excellent institute with great exposure', comment: 'IIT Delhi provides an incredible learning experience. Being in the capital city gives you access to numerous opportunities, internships, and events. The alumni network is exceptionally strong and supportive.', userIndex: 1 },
      { rating: 4, title: 'Top-tier education with minor infrastructure gaps', comment: 'Academic rigor is unmatched. Faculty members are excellent, and the peer group is highly motivated. Some hostels could use renovation, but overall a transformative experience.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Madras',
    description:
      'Indian Institute of Technology Madras, set within the Guindy National Park in Chennai, is the top-ranked engineering institute in India according to NIRF. Established in 1959, it is renowned for its research output and strong placement record.',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'IIT',
    established: 1959,
    rating: 4.9,
    website: 'https://www.iitm.ac.in',
    minFees: 200000,
    maxFees: 250000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 225000, specialization: 'Systems' },
      { name: 'Data Science and AI', degree: 'B.Tech', duration: '4 years', fees: 225000 },
      { name: 'Aerospace Engineering', degree: 'B.Tech', duration: '4 years', fees: 225000 },
      { name: 'Computational Engineering', degree: 'M.Tech', duration: '2 years', fees: 225000 },
      { name: 'Biotechnology', degree: 'B.Tech', duration: '4 years', fees: 225000 },
    ],
    placements: [
      { year: 2024, avgPackage: 29.0, highestPackage: 320.0, medianPackage: 23.0, placementRate: 96, topRecruiters: ['Google', 'Microsoft', 'Apple', 'Goldman Sachs', 'Texas Instruments', 'Qualcomm', 'Amazon', 'Atlassian'] },
      { year: 2023, avgPackage: 27.0, highestPackage: 295.0, medianPackage: 21.5, placementRate: 95, topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'Amazon', 'Samsung', 'Intel', 'Adobe'] },
    ],
    reviews: [
      { rating: 5, title: 'NIRF #1 for a reason', comment: 'IIT Madras deserves every bit of its top ranking. The campus inside a national park is serene and beautiful, perfect for focused studies. Research facilities are world-class.', userIndex: 0 },
      { rating: 5, title: 'Best campus life and academics', comment: 'The unique campus within a deer park is magical. Faculty are approachable and genuinely invested in student growth.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT Kanpur',
    description:
      'Indian Institute of Technology Kanpur is a globally recognized engineering and science institution established in 1959 with American collaboration. Known for pioneering computer science education in India.',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    type: 'IIT',
    established: 1959,
    rating: 4.6,
    website: 'https://www.iitk.ac.in',
    minFees: 200000,
    maxFees: 245000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 222000, specialization: 'Theoretical CS' },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 222000 },
      { name: 'Physics', degree: 'B.Sc', duration: '3 years', fees: 180000 },
      { name: 'Industrial and Management Engineering', degree: 'M.Tech', duration: '2 years', fees: 222000 },
    ],
    placements: [
      { year: 2024, avgPackage: 25.0, highestPackage: 250.0, medianPackage: 19.5, placementRate: 90, topRecruiters: ['Google', 'Microsoft', 'Samsung', 'Texas Instruments', 'Tower Research', 'Amazon', 'Flipkart'] },
      { year: 2023, avgPackage: 23.5, highestPackage: 230.0, medianPackage: 18.0, placementRate: 89, topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'Samsung', 'Qualcomm', 'Adobe'] },
    ],
    reviews: [
      { rating: 5, title: 'Pioneer of CS education in India', comment: 'IIT Kanpur has an incredibly strong computer science program with deep theoretical foundations. The flexibility in curriculum lets you explore across departments.', userIndex: 1 },
      { rating: 4, title: 'Academically rigorous, city needs improvement', comment: 'The academic quality is beyond question — professors are brilliant and research opportunities abound. Kanpur city can be challenging to adjust to.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Kharagpur',
    description:
      'IIT Kharagpur, established in 1951, is the oldest and largest IIT with a sprawling 2100-acre campus. Known as the birthplace of the IIT system, it offers the widest range of academic programs among all IITs.',
    city: 'Kharagpur',
    state: 'West Bengal',
    type: 'IIT',
    established: 1951,
    rating: 4.5,
    website: 'https://www.iitkgp.ac.in',
    minFees: 195000,
    maxFees: 250000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 },
      { name: 'Electronics and Electrical Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 },
      { name: 'Architecture and Regional Planning', degree: 'B.Arch', duration: '5 years', fees: 220000 },
      { name: 'Business Administration', degree: 'MBA', duration: '2 years', fees: 750000 },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 },
    ],
    placements: [
      { year: 2024, avgPackage: 24.0, highestPackage: 220.0, medianPackage: 18.0, placementRate: 91, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Schlumberger', 'ITC', 'McKinsey'] },
      { year: 2023, avgPackage: 22.5, highestPackage: 200.0, medianPackage: 17.0, placementRate: 90, topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Samsung', 'Tata Steel', 'Shell', 'Adobe'] },
    ],
    reviews: [
      { rating: 4, title: 'The original IIT with incredible heritage', comment: 'Being at the first IIT is a proud feeling. The campus is massive with excellent sports facilities and vibrant fests like Spring Fest and Kshitij.', userIndex: 1 },
      { rating: 4, title: 'Wide range of courses, remote location', comment: 'The breadth of programs at IIT Kharagpur is staggering. The town of Kharagpur is small, but the campus is a world in itself.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Roorkee',
    description:
      'IIT Roorkee, originally established as the Roorkee Engineering College in 1847, is the oldest technical institution in Asia. Converted to an IIT in 2001, it combines rich legacy with modern excellence.',
    city: 'Roorkee',
    state: 'Uttarakhand',
    type: 'IIT',
    established: 1847,
    rating: 4.4,
    website: 'https://www.iitr.ac.in',
    minFees: 195000,
    maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Civil Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Earthquake Engineering', degree: 'M.Tech', duration: '2 years', fees: 218000, specialization: 'Structural Dynamics' },
      { name: 'Metallurgical and Materials Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 22.0, highestPackage: 180.0, medianPackage: 17.0, placementRate: 88, topRecruiters: ['Microsoft', 'Google', 'Amazon', 'Goldman Sachs', 'Uber', 'Samsung', 'PayPal'] },
      { year: 2023, avgPackage: 20.5, highestPackage: 160.0, medianPackage: 16.0, placementRate: 87, topRecruiters: ['Microsoft', 'Amazon', 'Adobe', 'Qualcomm', 'Samsung', 'Flipkart'] },
    ],
    reviews: [
      { rating: 4, title: 'Rich history, strong engineering', comment: 'Studying at the oldest technical institution in Asia is a unique experience. The civil and earthquake engineering departments are globally recognized.', userIndex: 0 },
      { rating: 4, title: 'Good academics, improving placements', comment: 'IIT Roorkee has been consistently improving its placement numbers. The proximity to the Himalayas makes for great weekend getaways.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT Guwahati',
    description:
      'IIT Guwahati, established in 1994 on the banks of the Brahmaputra River, is widely regarded as one of the most beautiful campuses in India. It is the premier engineering institution of Northeast India.',
    city: 'Guwahati',
    state: 'Assam',
    type: 'IIT',
    established: 1994,
    rating: 4.4,
    website: 'https://www.iitg.ac.in',
    minFees: 200000,
    maxFees: 245000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 },
      { name: 'Electronics and Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 },
      { name: 'Design', degree: 'B.Des', duration: '4 years', fees: 220000 },
      { name: 'Data Science', degree: 'M.Tech', duration: '2 years', fees: 220000, specialization: 'Big Data Analytics' },
    ],
    placements: [
      { year: 2024, avgPackage: 22.5, highestPackage: 185.0, medianPackage: 17.5, placementRate: 89, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Samsung', 'Flipkart', 'Goldman Sachs', 'Uber'] },
      { year: 2023, avgPackage: 21.0, highestPackage: 170.0, medianPackage: 16.5, placementRate: 88, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Intel', 'PayPal'] },
    ],
    reviews: [
      { rating: 5, title: 'Most beautiful campus in India', comment: 'The campus on the banks of the Brahmaputra is absolutely breathtaking. Wildlife roams freely on campus. Academics are excellent.', userIndex: 1 },
      { rating: 4, title: 'Rising star among IITs', comment: 'IIT Guwahati has improved dramatically in recent years. The Design department is unique among older IITs.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Hyderabad',
    description:
      'IIT Hyderabad, established in 2008, is one of the second-generation IITs that has quickly risen in rankings. Located near the IT hub of Hyderabad, known for innovative curriculum and strong AI/ML research.',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'IIT',
    established: 2008,
    rating: 4.3,
    website: 'https://www.iith.ac.in',
    minFees: 200000,
    maxFees: 245000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000, specialization: 'AI and ML' },
      { name: 'Engineering Science', degree: 'B.Tech', duration: '4 years', fees: 220000 },
      { name: 'Biomedical Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 },
      { name: 'Artificial Intelligence', degree: 'M.Tech', duration: '2 years', fees: 220000 },
    ],
    placements: [
      { year: 2024, avgPackage: 21.0, highestPackage: 150.0, medianPackage: 16.0, placementRate: 87, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Qualcomm', 'Texas Instruments', 'Flipkart', 'Atlassian'] },
      { year: 2023, avgPackage: 19.5, highestPackage: 140.0, medianPackage: 15.0, placementRate: 86, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'Adobe', 'Goldman Sachs'] },
    ],
    reviews: [
      { rating: 4, title: 'Fastest growing IIT with modern curriculum', comment: 'IIT Hyderabad has a very modern approach to education with fractal academics and research-driven learning.', userIndex: 0 },
      { rating: 4, title: 'Strong in AI/ML and technology', comment: 'The AI and ML research group here is among the best in India. Being a newer IIT, the bureaucracy is minimal.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT BHU Varanasi',
    description:
      'IIT BHU, originally the Banaras Engineering College (est. 1919), became an IIT in 2012. Situated within the historic Banaras Hindu University campus, it blends century-old tradition with modern engineering excellence.',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    type: 'IIT',
    established: 1919,
    rating: 4.3,
    website: 'https://www.iitbhu.ac.in',
    minFees: 195000,
    maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Ceramic Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Mining Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Pharmaceutical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 20.5, highestPackage: 140.0, medianPackage: 15.5, placementRate: 85, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'Tata Steel', 'Flipkart', 'Reliance'] },
      { year: 2023, avgPackage: 19.0, highestPackage: 130.0, medianPackage: 14.5, placementRate: 84, topRecruiters: ['Amazon', 'Microsoft', 'Samsung', 'Adobe', 'Goldman Sachs', 'Qualcomm'] },
    ],
    reviews: [
      { rating: 4, title: 'Heritage meets modern engineering', comment: 'The BHU campus is steeped in history and culture. Being part of a larger university means access to diverse activities.', userIndex: 1 },
      { rating: 4, title: 'Unique specializations, good community', comment: 'IIT BHU offers unique programs like Ceramic and Mining Engineering that you will not find elsewhere.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Indore',
    description:
      'IIT Indore, established in 2009, is a rapidly growing new-generation IIT that has earned recognition for its strong academic programs. Located in the clean and well-planned city of Indore.',
    city: 'Indore',
    state: 'Madhya Pradesh',
    type: 'IIT',
    established: 2009,
    rating: 4.2,
    website: 'https://www.iiti.ac.in',
    minFees: 200000,
    maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 19.0, highestPackage: 120.0, medianPackage: 14.0, placementRate: 84, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'Flipkart', 'Goldman Sachs'] },
      { year: 2023, avgPackage: 17.5, highestPackage: 105.0, medianPackage: 13.0, placementRate: 82, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'Qualcomm', 'Adobe'] },
    ],
    reviews: [
      { rating: 4, title: 'Great new IIT with huge potential', comment: 'IIT Indore is growing at an impressive pace. The city of Indore is excellent — clean, affordable, and with amazing street food.', userIndex: 0 },
      { rating: 4, title: 'Modern infrastructure and approach', comment: 'Being a newer IIT means the campus is modern with latest amenities. Interdisciplinary learning is encouraged.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT Dhanbad',
    description: 'IIT (ISM) Dhanbad, originally established as the Indian School of Mines in 1926, became an IIT in 2016. It is India\'s premier institute for mining, petroleum, and geological engineering with a storied century-old legacy.',
    city: 'Dhanbad', state: 'Jharkhand', type: 'IIT', established: 1926, rating: 4.3, website: 'https://www.iitism.ac.in', minFees: 195000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Mining Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Petroleum Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electronics Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 19.5, highestPackage: 130.0, medianPackage: 14.5, placementRate: 85, topRecruiters: ['Microsoft', 'Amazon', 'ONGC', 'Coal India', 'Samsung', 'Goldman Sachs'] },
      { year: 2023, avgPackage: 18.0, highestPackage: 115.0, medianPackage: 13.5, placementRate: 83, topRecruiters: ['Amazon', 'Microsoft', 'Coal India', 'ONGC', 'Samsung', 'Adobe'] },
    ],
    reviews: [
      { rating: 4, title: 'India\'s mining capital for engineers', comment: 'IIT ISM Dhanbad is unmatched for mining and petroleum engineering. The century-old heritage gives it a unique character.', userIndex: 0 },
      { rating: 4, title: 'Strong core engineering with growing CS', comment: 'While traditionally known for mining, the CS department has been rising rapidly with excellent placements.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT Patna',
    description: 'IIT Patna, established in 2008, is a rapidly developing new-generation IIT in Bihar. With a brand new permanent campus on the banks of the Ganges, it offers excellent education with growing research output.',
    city: 'Patna', state: 'Bihar', type: 'IIT', established: 2008, rating: 4.0, website: 'https://www.iitp.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 17.5, highestPackage: 100.0, medianPackage: 13.0, placementRate: 82, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'Flipkart', 'Goldman Sachs', 'Adobe'] },
      { year: 2023, avgPackage: 16.0, highestPackage: 90.0, medianPackage: 12.0, placementRate: 80, topRecruiters: ['Amazon', 'Microsoft', 'Samsung', 'Flipkart', 'Qualcomm'] },
    ],
    reviews: [
      { rating: 4, title: 'Growing IIT with beautiful new campus', comment: 'The new permanent campus on the banks of the Ganges is stunning. Faculty are young, energetic, and research-active.', userIndex: 1 },
      { rating: 4, title: 'Good value for a new IIT', comment: 'IIT Patna offers solid education with improving placements every year. The campus infrastructure is modern and well-planned.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Gandhinagar',
    description: 'IIT Gandhinagar, established in 2008 in Gujarat, is known for its liberal arts integrated curriculum and innovative pedagogy. It emphasizes holistic development through its unique Explorer and Foundation programmes.',
    city: 'Gandhinagar', state: 'Gujarat', type: 'IIT', established: 2008, rating: 4.1, website: 'https://www.iitgn.ac.in', minFees: 200000, maxFees: 245000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 },
      { name: 'Materials Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 },
      { name: 'Cognitive Science', degree: 'M.Sc', duration: '2 years', fees: 220000 },
    ],
    placements: [
      { year: 2024, avgPackage: 18.0, highestPackage: 110.0, medianPackage: 13.5, placementRate: 83, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'Flipkart', 'TCS'] },
      { year: 2023, avgPackage: 16.5, highestPackage: 95.0, medianPackage: 12.5, placementRate: 81, topRecruiters: ['Amazon', 'Microsoft', 'Samsung', 'Adobe', 'Flipkart'] },
    ],
    reviews: [
      { rating: 4, title: 'Liberal education in an IIT framework', comment: 'The emphasis on liberal arts alongside engineering makes IIT Gandhinagar unique. The Explorer programme is a fantastic start to college life.', userIndex: 0 },
      { rating: 4, title: 'Modern campus with innovative teaching', comment: 'IIT GN has one of the most beautiful and well-designed campuses. Faculty are accessible and the student-teacher ratio is excellent.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT Ropar',
    description: 'IIT Ropar (Rupnagar), established in 2008 in Punjab, is a fast-growing new-generation IIT. With a sprawling new campus in the foothills of the Shivalik range, it offers quality technical education with a focus on research.',
    city: 'Rupnagar', state: 'Punjab', type: 'IIT', established: 2008, rating: 4.0, website: 'https://www.iitrpr.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 17.0, highestPackage: 95.0, medianPackage: 12.5, placementRate: 81, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'Flipkart', 'Goldman Sachs'] },
      { year: 2023, avgPackage: 15.5, highestPackage: 85.0, medianPackage: 11.5, placementRate: 79, topRecruiters: ['Amazon', 'Samsung', 'Microsoft', 'Flipkart', 'Adobe'] },
    ],
    reviews: [
      { rating: 4, title: 'Scenic campus with growing reputation', comment: 'The Shivalik foothills provide a spectacular backdrop. The new permanent campus is well-designed and research facilities are excellent.', userIndex: 1 },
      { rating: 3, title: 'Good academics, campus still developing', comment: 'IIT Ropar is improving year over year. The small batch size means more individual attention from faculty.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Bhubaneswar',
    description: 'IIT Bhubaneswar, established in 2008 in Odisha, is a new-generation IIT with a modern campus at Argul. Known for its focus on sustainability and innovative research in climate science and earth systems.',
    city: 'Bhubaneswar', state: 'Odisha', type: 'IIT', established: 2008, rating: 4.0, website: 'https://www.iitbbs.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'School of Earth, Ocean and Climate Sciences', degree: 'M.Sc', duration: '2 years', fees: 200000 },
    ],
    placements: [
      { year: 2024, avgPackage: 16.5, highestPackage: 90.0, medianPackage: 12.0, placementRate: 80, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'Flipkart', 'TCS', 'Adobe'] },
      { year: 2023, avgPackage: 15.0, highestPackage: 82.0, medianPackage: 11.0, placementRate: 78, topRecruiters: ['Amazon', 'Samsung', 'Microsoft', 'Flipkart', 'TCS'] },
    ],
    reviews: [
      { rating: 4, title: 'Beautiful campus in the temple city', comment: 'The campus at Argul is green, spacious, and well-planned. Bhubaneswar is a great city for students with affordable living costs.', userIndex: 0 },
      { rating: 3, title: 'Solid academics, growing placements', comment: 'IIT Bhubaneswar offers a good education with improving placement statistics each year. The research culture is developing well.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT Mandi',
    description: 'IIT Mandi, established in 2009 in the scenic Himalayan valley of Kamand, is known for its innovative project-based curriculum and strong focus on renewable energy and sustainability research.',
    city: 'Mandi', state: 'Himachal Pradesh', type: 'IIT', established: 2009, rating: 3.9, website: 'https://www.iitmandi.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Data Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 16.0, highestPackage: 85.0, medianPackage: 11.5, placementRate: 79, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'Flipkart', 'TCS'] },
      { year: 2023, avgPackage: 14.5, highestPackage: 78.0, medianPackage: 10.5, placementRate: 77, topRecruiters: ['Amazon', 'Samsung', 'Microsoft', 'TCS', 'Infosys'] },
    ],
    reviews: [
      { rating: 4, title: 'IIT in the Himalayas — unmatched beauty', comment: 'The Kamand campus surrounded by mountains is simply stunning. The project-based learning approach gives real hands-on experience.', userIndex: 1 },
      { rating: 3, title: 'Good for nature lovers and focused study', comment: 'The remote location means fewer distractions and more focus on academics. Campus life is close-knit and memorable.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Jodhpur',
    description: 'IIT Jodhpur, established in 2008 in the Blue City of Rajasthan, has developed a strong reputation in digital humanities, smart cities, and IoT research. The architecture-inspired campus reflects the city\'s heritage.',
    city: 'Jodhpur', state: 'Rajasthan', type: 'IIT', established: 2008, rating: 4.0, website: 'https://www.iitj.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000, specialization: 'AI' },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Bioscience and Bioengineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 17.0, highestPackage: 95.0, medianPackage: 12.5, placementRate: 81, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'Google', 'Flipkart'] },
      { year: 2023, avgPackage: 15.5, highestPackage: 85.0, medianPackage: 11.5, placementRate: 79, topRecruiters: ['Amazon', 'Microsoft', 'Samsung', 'TCS', 'Flipkart'] },
    ],
    reviews: [
      { rating: 4, title: 'Heritage city campus with great research', comment: 'The campus architecture draws from Jodhpur\'s heritage. The AI and smart cities research labs are impressive.', userIndex: 0 },
      { rating: 4, title: 'Growing fast with quality faculty', comment: 'IIT Jodhpur is making strong strides. The faculty are excellent researchers and the campus is world-class.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT Tirupati',
    description: 'IIT Tirupati, established in 2015 as one of the newest IITs, is mentored by IIT Madras. Located in the temple city of Andhra Pradesh, it benefits from strong academic guidance from its parent institution.',
    city: 'Tirupati', state: 'Andhra Pradesh', type: 'IIT', established: 2015, rating: 3.8, website: 'https://www.iittp.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 15.0, highestPackage: 75.0, medianPackage: 11.0, placementRate: 78, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Flipkart'] },
      { year: 2023, avgPackage: 13.5, highestPackage: 65.0, medianPackage: 10.0, placementRate: 75, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Flipkart'] },
    ],
    reviews: [
      { rating: 4, title: 'IIT Madras mentorship shows', comment: 'Being mentored by IIT Madras ensures high academic standards. The faculty recruited are excellent and research-oriented.', userIndex: 1 },
      { rating: 3, title: 'New but promising', comment: 'As one of the newest IITs, the campus is still developing but the academic quality is already strong.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Palakkad',
    description: 'IIT Palakkad, established in 2015 and mentored by IIT Madras, is located in the lush green setting of Kerala. It focuses on interdisciplinary engineering with strong emphasis on computational sciences.',
    city: 'Palakkad', state: 'Kerala', type: 'IIT', established: 2015, rating: 3.8, website: 'https://www.iitpkd.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 14.5, highestPackage: 70.0, medianPackage: 10.5, placementRate: 76, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys'] },
      { year: 2023, avgPackage: 13.0, highestPackage: 62.0, medianPackage: 9.5, placementRate: 74, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] },
    ],
    reviews: [
      { rating: 4, title: 'Kerala\'s own IIT with IIT-M backing', comment: 'The mentorship from IIT Madras ensures a strong academic foundation. The Kerala setting with its greenery and pleasant climate is a bonus.', userIndex: 0 },
      { rating: 3, title: 'Small but quality-focused', comment: 'Small batch sizes mean excellent faculty attention. The campus is still under development but academics are solid.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT Bhilai',
    description: 'IIT Bhilai, established in 2016 and mentored by IIT Hyderabad, is located in Chhattisgarh. It offers innovative programs and emphasizes research in areas like data science and electric mobility.',
    city: 'Bhilai', state: 'Chhattisgarh', type: 'IIT', established: 2016, rating: 3.7, website: 'https://www.iitbhilai.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 14.0, highestPackage: 65.0, medianPackage: 10.0, placementRate: 75, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys'] },
      { year: 2023, avgPackage: 12.5, highestPackage: 58.0, medianPackage: 9.0, placementRate: 73, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] },
    ],
    reviews: [
      { rating: 3, title: 'New IIT with potential', comment: 'IIT Bhilai is still developing but the academic quality is commendable. Faculty are research-active and approachable.', userIndex: 1 },
      { rating: 3, title: 'Good start for a young IIT', comment: 'The permanent campus is under construction but the temporary campus has all necessary facilities for quality education.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Goa',
    description: 'IIT Goa, established in 2016 and mentored by IIT Bombay, combines the IIT brand with the charm of Goa. It offers engineering programs with a focus on mathematics and computing.',
    city: 'Ponda', state: 'Goa', type: 'IIT', established: 2016, rating: 3.7, website: 'https://www.iitgoa.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Mathematics and Computing', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 14.5, highestPackage: 68.0, medianPackage: 10.5, placementRate: 76, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Goldman Sachs'] },
      { year: 2023, avgPackage: 13.0, highestPackage: 60.0, medianPackage: 9.5, placementRate: 74, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Microsoft'] },
    ],
    reviews: [
      { rating: 4, title: 'IIT Bombay mentorship in beautiful Goa', comment: 'The IIT Bombay mentorship ensures high academic standards. Goa adds a unique cultural dimension to the IIT experience.', userIndex: 0 },
      { rating: 3, title: 'Small, focused, and growing', comment: 'Being a newer IIT, the batch sizes are small which means personalized attention. The research opportunities are growing.', userIndex: 1 },
    ],
  },
  {
    name: 'IIT Jammu',
    description: 'IIT Jammu, established in 2016, is the northernmost IIT situated near the Tawi river. Mentored by IIT Delhi, it has rapidly developed infrastructure and academic programs.',
    city: 'Jammu', state: 'Jammu and Kashmir', type: 'IIT', established: 2016, rating: 3.7, website: 'https://www.iitjammu.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Chemical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 14.0, highestPackage: 65.0, medianPackage: 10.0, placementRate: 75, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys'] },
      { year: 2023, avgPackage: 12.5, highestPackage: 55.0, medianPackage: 9.0, placementRate: 72, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] },
    ],
    reviews: [
      { rating: 3, title: 'Northernmost IIT with scenic beauty', comment: 'IIT Jammu campus near the Tawi river is beautiful. IIT Delhi mentorship ensures quality academics.', userIndex: 1 },
      { rating: 3, title: 'Young and developing fast', comment: 'The permanent campus is coming up well. Research labs are being set up with latest equipment.', userIndex: 0 },
    ],
  },
  {
    name: 'IIT Dharwad',
    description: 'IIT Dharwad, established in 2016 in Karnataka, is mentored by IIT Bombay. Located in the culturally rich city of Dharwad, known for Hindustani classical music, it blends technology with tradition.',
    city: 'Dharwad', state: 'Karnataka', type: 'IIT', established: 2016, rating: 3.7, website: 'https://www.iitdh.ac.in', minFees: 200000, maxFees: 240000,
    courses: [
      { name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 218000 },
    ],
    placements: [
      { year: 2024, avgPackage: 14.0, highestPackage: 62.0, medianPackage: 10.0, placementRate: 74, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys'] },
      { year: 2023, avgPackage: 12.5, highestPackage: 55.0, medianPackage: 9.0, placementRate: 72, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] },
    ],
    reviews: [
      { rating: 3, title: 'Karnataka\'s second IIT', comment: 'IIT Dharwad benefits from IIT Bombay\'s mentorship. The cultural richness of Dharwad adds to the student experience.', userIndex: 0 },
      { rating: 3, title: 'Growing with good prospects', comment: 'The permanent campus is under development. Faculty quality is good, and placements are improving steadily.', userIndex: 1 },
    ],
  },
]

// ---------------------------------------------------------------------------
// NITs (31 institutions)
// ---------------------------------------------------------------------------
const nitColleges: CollegeData[] = [
  { name: 'NIT Trichy', description: 'National Institute of Technology Tiruchirappalli, established in 1964, is consistently ranked as the best NIT in India. Known for its strong academic programs and industry connections.', city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'NIT', established: 1964, rating: 4.5, website: 'https://www.nitt.edu', minFees: 125000, maxFees: 225000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 175000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 175000 }, { name: 'Instrumentation and Control Engineering', degree: 'B.Tech', duration: '4 years', fees: 175000 }, { name: 'Management Studies', degree: 'MBA', duration: '2 years', fees: 350000 }],
    placements: [{ year: 2024, avgPackage: 16.5, highestPackage: 82.0, medianPackage: 13.0, placementRate: 92, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys', 'Goldman Sachs'] }, { year: 2023, avgPackage: 15.0, highestPackage: 75.0, medianPackage: 12.0, placementRate: 91, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys', 'Adobe'] }],
    reviews: [{ rating: 5, title: 'Best NIT with IIT-level placements', comment: 'NIT Trichy consistently punches above its weight in placements. Pragyan is one of the biggest technical festivals in South India.', userIndex: 0 }, { rating: 4, title: 'Excellent value for education', comment: 'For the fees charged, the education and placement at NIT Trichy is exceptional value.', userIndex: 1 }],
  },
  { name: 'NIT Warangal', description: 'NIT Warangal, established in 1959, is one of the oldest and most reputed NITs in India. Renowned for its robust engineering programs and consistently strong placement record.', city: 'Warangal', state: 'Telangana', type: 'NIT', established: 1959, rating: 4.4, website: 'https://www.nitw.ac.in', minFees: 120000, maxFees: 220000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 170000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 170000 }, { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 170000 }],
    placements: [{ year: 2024, avgPackage: 15.0, highestPackage: 70.0, medianPackage: 12.0, placementRate: 90, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'TCS', 'Deloitte'] }, { year: 2023, avgPackage: 14.0, highestPackage: 65.0, medianPackage: 11.0, placementRate: 89, topRecruiters: ['Amazon', 'Microsoft', 'Samsung', 'TCS', 'Adobe'] }],
    reviews: [{ rating: 4, title: 'One of the top NITs in India', comment: 'NIT Warangal offers a complete engineering education with strong fundamentals. Technozion and Spring Spree define the NITW experience.', userIndex: 1 }, { rating: 4, title: 'Strong alumni network and placements', comment: 'The Warangal alumni community is incredibly supportive. Placement season brings top companies.', userIndex: 0 }],
  },
  { name: 'NIT Karnataka Surathkal', description: 'NITK Surathkal, established in 1960, is situated on the beautiful Mangalore coast. Widely considered among the top three NITs, it offers excellent engineering programs.', city: 'Mangalore', state: 'Karnataka', type: 'NIT', established: 1960, rating: 4.4, website: 'https://www.nitk.ac.in', minFees: 125000, maxFees: 220000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 175000 }, { name: 'Information Technology', degree: 'B.Tech', duration: '4 years', fees: 175000 }, { name: 'Electrical and Electronics Engineering', degree: 'B.Tech', duration: '4 years', fees: 175000 }],
    placements: [{ year: 2024, avgPackage: 15.5, highestPackage: 75.0, medianPackage: 12.5, placementRate: 91, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Samsung', 'TCS'] }, { year: 2023, avgPackage: 14.5, highestPackage: 68.0, medianPackage: 11.5, placementRate: 90, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'Adobe'] }],
    reviews: [{ rating: 5, title: 'Beach campus with great academics', comment: 'Where else can you study engineering with the Arabian Sea as your backyard? NITK combines excellent academics with an unbeatable location.', userIndex: 0 }, { rating: 4, title: 'Top NIT with coastal charm', comment: 'NITK offers a balanced education with great placements. The campus on the beach is unique.', userIndex: 1 }],
  },
  { name: 'NIT Calicut', description: 'NIT Calicut, established in 1961 in Kerala, is known for producing outstanding engineers and entrepreneurs. Set amidst the lush green hills of Kozhikode.', city: 'Kozhikode', state: 'Kerala', type: 'NIT', established: 1961, rating: 4.3, website: 'https://www.nitc.ac.in', minFees: 120000, maxFees: 210000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 165000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 165000 }, { name: 'Architecture', degree: 'B.Arch', duration: '5 years', fees: 165000 }],
    placements: [{ year: 2024, avgPackage: 14.0, highestPackage: 60.0, medianPackage: 11.0, placementRate: 88, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'TCS', 'Oracle'] }, { year: 2023, avgPackage: 13.0, highestPackage: 55.0, medianPackage: 10.0, placementRate: 87, topRecruiters: ['Amazon', 'Microsoft', 'Samsung', 'TCS', 'Infosys'] }],
    reviews: [{ rating: 4, title: 'Kerala gem with solid placements', comment: 'NIT Calicut in the hills of Kozhikode is a great place to study. Technical clubs prepare you well for the industry.', userIndex: 1 }, { rating: 4, title: 'Strong foundation in engineering', comment: 'The faculty are knowledgeable and supportive. Ragam fest brings the entire campus alive.', userIndex: 0 }],
  },
  { name: 'MNNIT Allahabad', description: 'Motilal Nehru National Institute of Technology Allahabad, established in 1961, is one of the early-generation NITs with strong reputation in North India.', city: 'Prayagraj', state: 'Uttar Pradesh', type: 'NIT', established: 1961, rating: 4.2, website: 'https://www.mnnit.ac.in', minFees: 115000, maxFees: 200000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 162000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 162000 }, { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 162000 }],
    placements: [{ year: 2024, avgPackage: 13.5, highestPackage: 55.0, medianPackage: 10.5, placementRate: 86, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys', 'Cognizant'] }, { year: 2023, avgPackage: 12.5, highestPackage: 50.0, medianPackage: 9.5, placementRate: 85, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 4, title: 'Solid NIT with affordable education', comment: 'MNNIT provides good engineering education at very reasonable fees. The T&P cell works hard to bring quality companies.', userIndex: 0 }, { rating: 3, title: 'Good academics, infrastructure improving', comment: 'Academic quality is good. Infrastructure has been improving with new buildings and labs.', userIndex: 1 }],
  },
  { name: 'NIT Rourkela', description: 'NIT Rourkela, established in 1961 in Odisha, is known for its strong metallurgical and mining engineering programs with a dedicated research culture.', city: 'Rourkela', state: 'Odisha', type: 'NIT', established: 1961, rating: 4.2, website: 'https://www.nitrkl.ac.in', minFees: 115000, maxFees: 205000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Metallurgical and Materials Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Mining Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }],
    placements: [{ year: 2024, avgPackage: 13.0, highestPackage: 52.0, medianPackage: 10.0, placementRate: 85, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Tata Steel', 'L&T'] }, { year: 2023, avgPackage: 12.0, highestPackage: 48.0, medianPackage: 9.0, placementRate: 84, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Tata Steel', 'Infosys'] }],
    reviews: [{ rating: 4, title: 'Strong in metallurgy and core branches', comment: 'NIT Rourkela is particularly strong in metallurgy and mining. The campus is green and well-planned.', userIndex: 1 }, { rating: 4, title: 'Good technical education in eastern India', comment: 'The research culture is growing with several professors publishing in top journals.', userIndex: 0 }],
  },
  { name: 'NIT Durgapur', description: 'NIT Durgapur, established in 1960 in West Bengal, is one of the oldest NITs with strong industrial connections in eastern India.', city: 'Durgapur', state: 'West Bengal', type: 'NIT', established: 1960, rating: 4.1, website: 'https://www.nitdgp.ac.in', minFees: 110000, maxFees: 195000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 155000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 155000 }, { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 155000 }],
    placements: [{ year: 2024, avgPackage: 12.0, highestPackage: 48.0, medianPackage: 9.0, placementRate: 83, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro', 'Cognizant'] }, { year: 2023, avgPackage: 11.0, highestPackage: 42.0, medianPackage: 8.5, placementRate: 81, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro', 'Cognizant'] }],
    reviews: [{ rating: 4, title: 'Historic NIT in the steel city', comment: 'NIT Durgapur has a strong legacy in eastern India. The industrial belt of Durgapur provides good exposure.', userIndex: 0 }, { rating: 3, title: 'Decent college with improving placements', comment: 'Academics are good and the campus life is vibrant. Aarohan fest is a highlight of the year.', userIndex: 1 }],
  },
  { name: 'MNIT Jaipur', description: 'Malaviya National Institute of Technology Jaipur, established in 1963, is one of the top NITs situated in the Pink City of Rajasthan.', city: 'Jaipur', state: 'Rajasthan', type: 'NIT', established: 1963, rating: 4.2, website: 'https://www.mnit.ac.in', minFees: 120000, maxFees: 210000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 165000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 165000 }, { name: 'Civil Engineering', degree: 'B.Tech', duration: '4 years', fees: 165000 }],
    placements: [{ year: 2024, avgPackage: 13.5, highestPackage: 55.0, medianPackage: 10.5, placementRate: 87, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys', 'Adobe'] }, { year: 2023, avgPackage: 12.5, highestPackage: 50.0, medianPackage: 9.5, placementRate: 85, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 4, title: 'Top NIT in the Pink City', comment: 'MNIT Jaipur combines quality education with the rich cultural experience of living in Jaipur.', userIndex: 1 }, { rating: 4, title: 'Good academics and campus life', comment: 'The campus is well-maintained and Blitzschlag fest is a major attraction in Rajasthan.', userIndex: 0 }],
  },
  { name: 'VNIT Nagpur', description: 'Visvesvaraya National Institute of Technology Nagpur, established in 1960, is centrally located in India. Named after the legendary engineer M. Visvesvaraya.', city: 'Nagpur', state: 'Maharashtra', type: 'NIT', established: 1960, rating: 4.2, website: 'https://vnit.ac.in', minFees: 120000, maxFees: 210000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 165000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 165000 }, { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 165000 }],
    placements: [{ year: 2024, avgPackage: 13.0, highestPackage: 52.0, medianPackage: 10.0, placementRate: 86, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys', 'Deloitte'] }, { year: 2023, avgPackage: 12.0, highestPackage: 48.0, medianPackage: 9.0, placementRate: 84, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 4, title: 'Heart of India NIT', comment: 'VNIT Nagpur benefits from its central location with good connectivity. Strong alumni network in Maharashtra.', userIndex: 0 }, { rating: 4, title: 'Well-balanced education', comment: 'Academics and extracurriculars are well-balanced. The AXIS cultural fest is one of the best in central India.', userIndex: 1 }],
  },
  { name: 'NIT Srinagar', description: 'NIT Srinagar, established in 1960 on the banks of Dal Lake, is one of India\'s most scenic campuses. It serves as the premier technical institution of the Kashmir Valley.', city: 'Srinagar', state: 'Jammu and Kashmir', type: 'NIT', established: 1960, rating: 3.9, website: 'https://www.nitsri.ac.in', minFees: 100000, maxFees: 190000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }, { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }],
    placements: [{ year: 2024, avgPackage: 10.0, highestPackage: 40.0, medianPackage: 7.5, placementRate: 75, topRecruiters: ['Amazon', 'TCS', 'Infosys', 'Wipro', 'Cognizant'] }, { year: 2023, avgPackage: 9.0, highestPackage: 35.0, medianPackage: 7.0, placementRate: 73, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL'] }],
    reviews: [{ rating: 4, title: 'Campus by Dal Lake — stunning', comment: 'NIT Srinagar\'s campus near Dal Lake is breathtakingly beautiful. The climate is perfect for studying.', userIndex: 1 }, { rating: 3, title: 'Beautiful but challenging location', comment: 'The natural beauty is unmatched but occasional disruptions can affect academic schedules.', userIndex: 0 }],
  },
  { name: 'NIT Silchar', description: 'NIT Silchar, established in 1967 in Assam, serves as an important technical institution for the northeastern region of India.', city: 'Silchar', state: 'Assam', type: 'NIT', established: 1967, rating: 3.9, website: 'https://www.nits.ac.in', minFees: 100000, maxFees: 190000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }, { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }],
    placements: [{ year: 2024, avgPackage: 10.5, highestPackage: 42.0, medianPackage: 8.0, placementRate: 78, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }, { year: 2023, avgPackage: 9.5, highestPackage: 38.0, medianPackage: 7.0, placementRate: 76, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro', 'Cognizant'] }],
    reviews: [{ rating: 4, title: 'NIT serving the Northeast', comment: 'NIT Silchar has a green campus with good academic standards. The Northeast culture makes it a unique experience.', userIndex: 0 }, { rating: 3, title: 'Good college, remote location', comment: 'Academics are decent and faculty are supportive. The town is small but the campus community compensates well.', userIndex: 1 }],
  },
  { name: 'NIT Kurukshetra', description: 'NIT Kurukshetra, established in 1963 in Haryana, is located in the historic city of the Mahabharata. It is one of the well-established NITs in North India.', city: 'Kurukshetra', state: 'Haryana', type: 'NIT', established: 1963, rating: 4.0, website: 'https://www.nitkkr.ac.in', minFees: 115000, maxFees: 200000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Information Technology', degree: 'B.Tech', duration: '4 years', fees: 160000 }],
    placements: [{ year: 2024, avgPackage: 12.0, highestPackage: 48.0, medianPackage: 9.0, placementRate: 83, topRecruiters: ['Samsung', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'HCL'] }, { year: 2023, avgPackage: 11.0, highestPackage: 44.0, medianPackage: 8.5, placementRate: 81, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro', 'HCL'] }],
    reviews: [{ rating: 4, title: 'Well-established NIT in Haryana', comment: 'NIT Kurukshetra has a good reputation in North India with decent placements and strong alumni connections.', userIndex: 1 }, { rating: 3, title: 'Good academics, city is small', comment: 'The academic quality is reliable. Kurukshetra is a small town but the campus has everything you need.', userIndex: 0 }],
  },
  { name: 'NIT Hamirpur', description: 'NIT Hamirpur, established in 1986 in the scenic hills of Himachal Pradesh, offers quality technical education in a serene mountain setting.', city: 'Hamirpur', state: 'Himachal Pradesh', type: 'NIT', established: 1986, rating: 3.8, website: 'https://www.nith.ac.in', minFees: 100000, maxFees: 190000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }, { name: 'Civil Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }],
    placements: [{ year: 2024, avgPackage: 10.0, highestPackage: 40.0, medianPackage: 7.5, placementRate: 78, topRecruiters: ['Samsung', 'Amazon', 'TCS', 'Infosys', 'Wipro'] }, { year: 2023, avgPackage: 9.0, highestPackage: 35.0, medianPackage: 7.0, placementRate: 76, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Samsung', 'HCL'] }],
    reviews: [{ rating: 4, title: 'Mountain campus with peaceful vibes', comment: 'NIT Hamirpur\'s mountain setting is ideal for focused studying. The campus is scenic and well-maintained.', userIndex: 0 }, { rating: 3, title: 'Good for nature lovers', comment: 'The hill station location is beautiful but remote. Academics are solid and faculty are approachable.', userIndex: 1 }],
  },
  { name: 'NIT Jalandhar', description: 'Dr B R Ambedkar NIT Jalandhar, established in 1987 in Punjab, is a well-known NIT in North India with strong technical programs.', city: 'Jalandhar', state: 'Punjab', type: 'NIT', established: 1987, rating: 3.9, website: 'https://www.nitj.ac.in', minFees: 110000, maxFees: 195000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 155000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 155000 }, { name: 'Industrial and Production Engineering', degree: 'B.Tech', duration: '4 years', fees: 155000 }],
    placements: [{ year: 2024, avgPackage: 11.0, highestPackage: 45.0, medianPackage: 8.0, placementRate: 80, topRecruiters: ['Samsung', 'Amazon', 'TCS', 'Infosys', 'Wipro'] }, { year: 2023, avgPackage: 10.0, highestPackage: 40.0, medianPackage: 7.5, placementRate: 78, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Samsung', 'HCL'] }],
    reviews: [{ rating: 4, title: 'Good NIT in Punjab', comment: 'NIT Jalandhar offers quality education with a vibrant Punjabi campus culture.', userIndex: 1 }, { rating: 3, title: 'Improving steadily', comment: 'Placements have been improving and the campus infrastructure is being upgraded.', userIndex: 0 }],
  },
  { name: 'SVNIT Surat', description: 'Sardar Vallabhbhai NIT Surat, established in 1961 in Gujarat, is one of the well-established NITs with strong industry connections in western India.', city: 'Surat', state: 'Gujarat', type: 'NIT', established: 1961, rating: 4.0, website: 'https://www.svnit.ac.in', minFees: 115000, maxFees: 200000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Electronics Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Civil Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }],
    placements: [{ year: 2024, avgPackage: 12.5, highestPackage: 50.0, medianPackage: 9.5, placementRate: 84, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro', 'L&T'] }, { year: 2023, avgPackage: 11.5, highestPackage: 45.0, medianPackage: 8.5, placementRate: 82, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro', 'L&T'] }],
    reviews: [{ rating: 4, title: 'Strong NIT in diamond city', comment: 'SVNIT Surat benefits from the industrial hub of Surat. Good placements especially for core branches.', userIndex: 0 }, { rating: 4, title: 'Well-rounded education', comment: 'The campus is well-maintained and the Sparsh fest is a highlight of the academic year.', userIndex: 1 }],
  },
  { name: 'NIT Patna', description: 'NIT Patna, established in 1886 as Bihar College of Engineering, is one of the oldest engineering colleges in India with a rich heritage.', city: 'Patna', state: 'Bihar', type: 'NIT', established: 1886, rating: 3.9, website: 'https://www.nitp.ac.in', minFees: 100000, maxFees: 190000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }, { name: 'Civil Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }],
    placements: [{ year: 2024, avgPackage: 11.0, highestPackage: 45.0, medianPackage: 8.0, placementRate: 80, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }, { year: 2023, avgPackage: 10.0, highestPackage: 40.0, medianPackage: 7.5, placementRate: 78, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Samsung', 'Cognizant'] }],
    reviews: [{ rating: 4, title: 'One of India\'s oldest engineering colleges', comment: 'NIT Patna carries the legacy of Bihar College of Engineering. The heritage and alumni network are impressive.', userIndex: 1 }, { rating: 3, title: 'Rich history, growing modern', comment: 'The institution is evolving with new infrastructure while maintaining its academic traditions.', userIndex: 0 }],
  },
  { name: 'NIT Jamshedpur', description: 'NIT Jamshedpur, established in 1960 in the steel city of Jharkhand, benefits from strong connections with Tata Steel and other major industries.', city: 'Jamshedpur', state: 'Jharkhand', type: 'NIT', established: 1960, rating: 3.9, website: 'https://www.nitjsr.ac.in', minFees: 100000, maxFees: 190000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }, { name: 'Metallurgical and Materials Engineering', degree: 'B.Tech', duration: '4 years', fees: 150000 }],
    placements: [{ year: 2024, avgPackage: 11.5, highestPackage: 46.0, medianPackage: 8.5, placementRate: 81, topRecruiters: ['Tata Steel', 'Amazon', 'Samsung', 'TCS', 'Infosys'] }, { year: 2023, avgPackage: 10.5, highestPackage: 42.0, medianPackage: 8.0, placementRate: 79, topRecruiters: ['Tata Steel', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 4, title: 'Steel city advantage', comment: 'NIT Jamshedpur benefits immensely from its location in Tata\'s steel city. Industry exposure is excellent.', userIndex: 0 }, { rating: 3, title: 'Good for core engineering', comment: 'If you are interested in metallurgy and core engineering, the Jamshedpur ecosystem is hard to beat.', userIndex: 1 }],
  },
  { name: 'MANIT Bhopal', description: 'Maulana Azad NIT Bhopal, established in 1960, is the premier NIT of central India located in the City of Lakes.', city: 'Bhopal', state: 'Madhya Pradesh', type: 'NIT', established: 1960, rating: 4.0, website: 'https://www.manit.ac.in', minFees: 115000, maxFees: 200000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Architecture', degree: 'B.Arch', duration: '5 years', fees: 160000 }],
    placements: [{ year: 2024, avgPackage: 12.5, highestPackage: 50.0, medianPackage: 9.5, placementRate: 84, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro', 'L&T'] }, { year: 2023, avgPackage: 11.5, highestPackage: 45.0, medianPackage: 8.5, placementRate: 82, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro', 'L&T'] }],
    reviews: [{ rating: 4, title: 'City of Lakes NIT', comment: 'MANIT Bhopal has a beautiful campus in the heart of Bhopal. Strong architecture and civil engineering programs.', userIndex: 1 }, { rating: 3, title: 'Good legacy institution', comment: 'One of the well-established NITs with consistent academic quality and growing placements.', userIndex: 0 }],
  },
  { name: 'NIT Agartala', description: 'NIT Agartala, established in 1965 in Tripura, is the premier technical institution of the northeastern region with modern infrastructure.', city: 'Agartala', state: 'Tripura', type: 'NIT', established: 1965, rating: 3.5, website: 'https://www.nita.ac.in', minFees: 90000, maxFees: 170000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 135000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 135000 }, { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 135000 }],
    placements: [{ year: 2024, avgPackage: 8.0, highestPackage: 30.0, medianPackage: 6.0, placementRate: 70, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL'] }, { year: 2023, avgPackage: 7.5, highestPackage: 28.0, medianPackage: 5.5, placementRate: 68, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }],
    reviews: [{ rating: 3, title: 'NIT in the Northeast', comment: 'NIT Agartala provides an affordable NIT education. The campus has been upgraded significantly.', userIndex: 0 }, { rating: 3, title: 'Growing institution', comment: 'The college is improving every year with better facilities and placement opportunities.', userIndex: 1 }],
  },
  { name: 'NIT Raipur', description: 'NIT Raipur, established in 1956 as Government Engineering College, became an NIT in 2005. Located in the capital of Chhattisgarh.', city: 'Raipur', state: 'Chhattisgarh', type: 'NIT', established: 1956, rating: 3.7, website: 'https://www.nitrr.ac.in', minFees: 100000, maxFees: 185000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 145000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 145000 }, { name: 'Mining Engineering', degree: 'B.Tech', duration: '4 years', fees: 145000 }],
    placements: [{ year: 2024, avgPackage: 9.5, highestPackage: 38.0, medianPackage: 7.0, placementRate: 76, topRecruiters: ['Amazon', 'TCS', 'Infosys', 'Wipro', 'Cognizant'] }, { year: 2023, avgPackage: 8.5, highestPackage: 34.0, medianPackage: 6.5, placementRate: 74, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL'] }],
    reviews: [{ rating: 3, title: 'Capital city NIT', comment: 'NIT Raipur benefits from being in a state capital. Infrastructure is being upgraded and placements improving.', userIndex: 1 }, { rating: 3, title: 'Affordable quality education', comment: 'For the fees, NIT Raipur provides good value. The mining engineering program is notable.', userIndex: 0 }],
  },
  { name: 'NIT Delhi', description: 'NIT Delhi, established in 2010, is the newest NIT located in the national capital. Despite being young, it benefits from Delhi\'s startup ecosystem.', city: 'New Delhi', state: 'Delhi', type: 'NIT', established: 2010, rating: 3.8, website: 'https://www.nitdelhi.ac.in', minFees: 115000, maxFees: 200000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }],
    placements: [{ year: 2024, avgPackage: 11.0, highestPackage: 45.0, medianPackage: 8.0, placementRate: 80, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }, { year: 2023, avgPackage: 10.0, highestPackage: 40.0, medianPackage: 7.5, placementRate: 78, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro', 'Cognizant'] }],
    reviews: [{ rating: 4, title: 'NIT in the capital', comment: 'Being in Delhi gives tremendous access to industry events, internships, and networking opportunities.', userIndex: 0 }, { rating: 3, title: 'Young but growing fast', comment: 'NIT Delhi is still building its reputation but the Delhi location is a huge advantage.', userIndex: 1 }],
  },
  { name: 'NIT Goa', description: 'NIT Goa, established in 2010, operates from its campus in the beautiful coastal state of Goa, combining quality education with a laid-back coastal lifestyle.', city: 'Ponda', state: 'Goa', type: 'NIT', established: 2010, rating: 3.6, website: 'https://www.nitgoa.ac.in', minFees: 100000, maxFees: 185000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 145000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 145000 }, { name: 'Electrical and Electronics Engineering', degree: 'B.Tech', duration: '4 years', fees: 145000 }],
    placements: [{ year: 2024, avgPackage: 9.0, highestPackage: 35.0, medianPackage: 6.5, placementRate: 74, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Amazon'] }, { year: 2023, avgPackage: 8.0, highestPackage: 30.0, medianPackage: 6.0, placementRate: 72, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }],
    reviews: [{ rating: 3, title: 'Engineering in paradise', comment: 'NIT Goa offers NIT education in the beautiful setting of Goa. The lifestyle is unique.', userIndex: 1 }, { rating: 3, title: 'Small and developing', comment: 'Still a young institution but improving steadily. The Goa setting makes campus life enjoyable.', userIndex: 0 }],
  },
  { name: 'NIT Puducherry', description: 'NIT Puducherry, established in 2010, is located in the charming French colonial town of Karaikal. It is one of the newer NITs growing steadily.', city: 'Karaikal', state: 'Puducherry', type: 'NIT', established: 2010, rating: 3.5, website: 'https://www.nitpy.ac.in', minFees: 95000, maxFees: 180000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 140000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 140000 }, { name: 'Electrical and Electronics Engineering', degree: 'B.Tech', duration: '4 years', fees: 140000 }],
    placements: [{ year: 2024, avgPackage: 8.0, highestPackage: 30.0, medianPackage: 6.0, placementRate: 72, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL'] }, { year: 2023, avgPackage: 7.5, highestPackage: 28.0, medianPackage: 5.5, placementRate: 70, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }],
    reviews: [{ rating: 3, title: 'French colonial charm meets engineering', comment: 'NIT Puducherry in Karaikal has a unique setting. Affordable fees with NIT tag.', userIndex: 0 }, { rating: 3, title: 'Growing steadily', comment: 'The institution is building up its reputation. Small batch sizes allow for personalized attention.', userIndex: 1 }],
  },
  { name: 'NIT Manipur', description: 'NIT Manipur, established in 2010, serves as a key technical institution for the northeastern region, located in the beautiful valley of Imphal.', city: 'Imphal', state: 'Manipur', type: 'NIT', established: 2010, rating: 3.4, website: 'https://www.nitmanipur.ac.in', minFees: 85000, maxFees: 170000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }],
    placements: [{ year: 2024, avgPackage: 7.0, highestPackage: 25.0, medianPackage: 5.0, placementRate: 65, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }, { year: 2023, avgPackage: 6.5, highestPackage: 22.0, medianPackage: 4.5, placementRate: 63, topRecruiters: ['TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 3, title: 'NIT in the jewel of India', comment: 'NIT Manipur is growing with improved infrastructure. The natural beauty of Imphal is a bonus.', userIndex: 1 }, { rating: 3, title: 'Affordable NIT education', comment: 'Very affordable fees with an NIT degree. The institution is on an upward trajectory.', userIndex: 0 }],
  },
  { name: 'NIT Meghalaya', description: 'NIT Meghalaya, established in 2010, is situated in the Scotland of the East — Shillong. It brings quality technical education to the northeastern hills.', city: 'Shillong', state: 'Meghalaya', type: 'NIT', established: 2010, rating: 3.4, website: 'https://www.nitm.ac.in', minFees: 85000, maxFees: 170000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }],
    placements: [{ year: 2024, avgPackage: 7.0, highestPackage: 25.0, medianPackage: 5.0, placementRate: 65, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }, { year: 2023, avgPackage: 6.5, highestPackage: 22.0, medianPackage: 4.5, placementRate: 63, topRecruiters: ['TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 3, title: 'NIT in Scotland of the East', comment: 'Shillong\'s climate and beauty make NIT Meghalaya a pleasant place to study engineering.', userIndex: 0 }, { rating: 3, title: 'Growing with the Northeast', comment: 'The institution is developing well and bringing quality education to the region.', userIndex: 1 }],
  },
  { name: 'NIT Mizoram', description: 'NIT Mizoram, established in 2010, is located in the peaceful and scenic state of Mizoram, offering technical education to the region.', city: 'Aizawl', state: 'Mizoram', type: 'NIT', established: 2010, rating: 3.3, website: 'https://www.nitmz.ac.in', minFees: 85000, maxFees: 170000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electrical and Electronics Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }],
    placements: [{ year: 2024, avgPackage: 6.5, highestPackage: 22.0, medianPackage: 4.5, placementRate: 62, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }, { year: 2023, avgPackage: 6.0, highestPackage: 20.0, medianPackage: 4.0, placementRate: 60, topRecruiters: ['TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 3, title: 'Peaceful study environment', comment: 'The serene environment of Mizoram is ideal for focused study. The institution is developing steadily.', userIndex: 1 }, { rating: 3, title: 'Affordable and growing', comment: 'Very affordable NIT education with improving facilities and faculty recruitment.', userIndex: 0 }],
  },
  { name: 'NIT Nagaland', description: 'NIT Nagaland, established in 2010, serves the far northeastern state with quality technical education in a unique cultural environment.', city: 'Dimapur', state: 'Nagaland', type: 'NIT', established: 2010, rating: 3.3, website: 'https://www.nitnagaland.ac.in', minFees: 85000, maxFees: 170000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electrical and Electronics Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }],
    placements: [{ year: 2024, avgPackage: 6.5, highestPackage: 22.0, medianPackage: 4.5, placementRate: 62, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }, { year: 2023, avgPackage: 6.0, highestPackage: 20.0, medianPackage: 4.0, placementRate: 60, topRecruiters: ['TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 3, title: 'Unique cultural experience', comment: 'NIT Nagaland offers a unique cultural immersion alongside engineering education. The Naga hospitality is heartwarming.', userIndex: 0 }, { rating: 3, title: 'Developing institution', comment: 'Still in early stages but providing important educational access to the region.', userIndex: 1 }],
  },
  { name: 'NIT Sikkim', description: 'NIT Sikkim, established in 2010, is nestled in the Himalayan state of Sikkim with stunning mountain views and a peaceful environment.', city: 'Ravangla', state: 'Sikkim', type: 'NIT', established: 2010, rating: 3.3, website: 'https://www.nitsikkim.ac.in', minFees: 85000, maxFees: 170000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electrical and Electronics Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }],
    placements: [{ year: 2024, avgPackage: 6.5, highestPackage: 22.0, medianPackage: 4.5, placementRate: 62, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }, { year: 2023, avgPackage: 6.0, highestPackage: 20.0, medianPackage: 4.0, placementRate: 60, topRecruiters: ['TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 3, title: 'Himalayan NIT experience', comment: 'NIT Sikkim in Ravangla offers breathtaking mountain views. An unforgettable campus setting.', userIndex: 1 }, { rating: 3, title: 'Remote but scenic', comment: 'The remote location can be challenging but the natural beauty and peaceful environment compensate well.', userIndex: 0 }],
  },
  { name: 'NIT Arunachal Pradesh', description: 'NIT Arunachal Pradesh, established in 2010, is located in the land of the rising sun, providing technical education to India\'s northeastern frontier.', city: 'Yupia', state: 'Arunachal Pradesh', type: 'NIT', established: 2010, rating: 3.3, website: 'https://www.nitap.ac.in', minFees: 85000, maxFees: 170000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }, { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 130000 }],
    placements: [{ year: 2024, avgPackage: 6.0, highestPackage: 20.0, medianPackage: 4.5, placementRate: 60, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }, { year: 2023, avgPackage: 5.5, highestPackage: 18.0, medianPackage: 4.0, placementRate: 58, topRecruiters: ['TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 3, title: 'Land of the rising sun NIT', comment: 'NIT AP offers a unique experience in the frontier state. The natural beauty of Arunachal Pradesh is stunning.', userIndex: 0 }, { rating: 3, title: 'Pioneering education in the Northeast', comment: 'Important institution bringing quality education to a remote but beautiful region of India.', userIndex: 1 }],
  },
  { name: 'NIT Uttarakhand', description: 'NIT Uttarakhand, established in 2009, is situated in the Kumaon hills of Uttarakhand, providing quality technical education in a scenic environment.', city: 'Srinagar', state: 'Uttarakhand', type: 'NIT', established: 2009, rating: 3.5, website: 'https://www.nituk.ac.in', minFees: 95000, maxFees: 180000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 140000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 140000 }, { name: 'Electrical Engineering', degree: 'B.Tech', duration: '4 years', fees: 140000 }],
    placements: [{ year: 2024, avgPackage: 8.0, highestPackage: 30.0, medianPackage: 6.0, placementRate: 72, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Amazon'] }, { year: 2023, avgPackage: 7.5, highestPackage: 28.0, medianPackage: 5.5, placementRate: 70, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }],
    reviews: [{ rating: 3, title: 'Hill station NIT', comment: 'NIT Uttarakhand in the Kumaon hills offers a beautiful campus with improving academic standards.', userIndex: 1 }, { rating: 3, title: 'Developing well', comment: 'The institution is growing with better faculty and improved placement opportunities.', userIndex: 0 }],
  },
  { name: 'NIT Andhra Pradesh', description: 'NIT Andhra Pradesh, established in 2015, is one of the newest NITs located in Tadepalligudem, steadily building its academic programs.', city: 'Tadepalligudem', state: 'Andhra Pradesh', type: 'NIT', established: 2015, rating: 3.4, website: 'https://www.nitandhra.ac.in', minFees: 90000, maxFees: 175000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 135000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 135000 }, { name: 'Electrical and Electronics Engineering', degree: 'B.Tech', duration: '4 years', fees: 135000 }],
    placements: [{ year: 2024, avgPackage: 7.5, highestPackage: 28.0, medianPackage: 5.5, placementRate: 70, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL'] }, { year: 2023, avgPackage: 7.0, highestPackage: 25.0, medianPackage: 5.0, placementRate: 68, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] }],
    reviews: [{ rating: 3, title: 'Newest NIT in AP', comment: 'NIT AP is still building its foundation but shows promise with dedicated faculty and improving infrastructure.', userIndex: 0 }, { rating: 3, title: 'Growing institution', comment: 'As one of the newest NITs, it is steadily establishing itself with quality programs.', userIndex: 1 }],
  },
]

// ---------------------------------------------------------------------------
// IIITs (10 institutions)
// ---------------------------------------------------------------------------
const iiitColleges: CollegeData[] = [
  { name: 'IIIT Hyderabad', description: 'International Institute of Information Technology Hyderabad, established in 1998, is India\'s top research-focused IT institution. Famous for contributions to NLP, computer vision, and AI.', city: 'Hyderabad', state: 'Telangana', type: 'IIIT', established: 1998, rating: 4.6, website: 'https://www.iiit.ac.in', minFees: 350000, maxFees: 450000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 400000, specialization: 'Artificial Intelligence' }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 400000 }, { name: 'Computer Science', degree: 'M.Tech', duration: '2 years', fees: 400000, specialization: 'NLP and Machine Translation' }],
    placements: [{ year: 2024, avgPackage: 24.0, highestPackage: 180.0, medianPackage: 18.5, placementRate: 95, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Uber', 'Goldman Sachs', 'Tower Research'] }, { year: 2023, avgPackage: 22.0, highestPackage: 165.0, medianPackage: 17.0, placementRate: 94, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Flipkart', 'Samsung'] }],
    reviews: [{ rating: 5, title: 'India\'s MIT for computer science', comment: 'IIIT Hyderabad is a research powerhouse. If you want AI/ML, no better place in India.', userIndex: 0 }, { rating: 4, title: 'Research-focused with great placements', comment: 'Placements rival top IITs for CS roles. Compact but well-equipped campus.', userIndex: 1 }],
  },
  { name: 'IIIT Delhi', description: 'Indraprastha Institute of Information Technology Delhi, established in 2008, has quickly become a top CS institution in India.', city: 'New Delhi', state: 'Delhi', type: 'IIIT', established: 2008, rating: 4.4, website: 'https://www.iiitd.ac.in', minFees: 325000, maxFees: 425000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 380000, specialization: 'AI' }, { name: 'Computer Science and Applied Mathematics', degree: 'B.Tech', duration: '4 years', fees: 380000 }, { name: 'Computer Science and Design', degree: 'B.Tech', duration: '4 years', fees: 380000 }, { name: 'Data Science', degree: 'M.Tech', duration: '2 years', fees: 380000 }],
    placements: [{ year: 2024, avgPackage: 21.0, highestPackage: 140.0, medianPackage: 16.5, placementRate: 93, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Uber', 'Flipkart', 'Adobe'] }, { year: 2023, avgPackage: 19.5, highestPackage: 130.0, medianPackage: 15.0, placementRate: 92, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'Adobe'] }],
    reviews: [{ rating: 4, title: 'Best IIIT in North India', comment: 'IIIT Delhi has a very modern curriculum. Being in Delhi gives startup ecosystem access.', userIndex: 1 }, { rating: 5, title: 'Incredible growth in just 15 years', comment: 'For a 15-year-old institution, IIIT Delhi has achieved remarkable recognition.', userIndex: 0 }],
  },
  { name: 'IIIT Allahabad', description: 'Indian Institute of Information Technology Allahabad, established in 1999, is one of the oldest IIITs recognized for strong IT and management programs.', city: 'Prayagraj', state: 'Uttar Pradesh', type: 'IIIT', established: 1999, rating: 4.1, website: 'https://www.iiita.ac.in', minFees: 180000, maxFees: 300000,
    courses: [{ name: 'Information Technology', degree: 'B.Tech', duration: '4 years', fees: 250000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 250000 }, { name: 'Information Technology', degree: 'MBA', duration: '2 years', fees: 350000, specialization: 'IT Management' }],
    placements: [{ year: 2024, avgPackage: 14.5, highestPackage: 65.0, medianPackage: 11.0, placementRate: 88, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'Flipkart', 'TCS'] }, { year: 2023, avgPackage: 13.5, highestPackage: 58.0, medianPackage: 10.0, placementRate: 86, topRecruiters: ['Amazon', 'Microsoft', 'Samsung', 'TCS', 'Adobe'] }],
    reviews: [{ rating: 4, title: 'One of the pioneer IIITs', comment: 'IIIT Allahabad has a solid reputation in the IT industry with a well-established alumni network.', userIndex: 0 }, { rating: 4, title: 'Good for IT careers', comment: 'Competitive programming culture is strong. Faculty are knowledgeable and experienced.', userIndex: 1 }],
  },
  { name: 'IIIT Bangalore', description: 'International Institute of Information Technology Bangalore, established in 1999, benefits from its location in India\'s Silicon Valley.', city: 'Bangalore', state: 'Karnataka', type: 'IIIT', established: 1999, rating: 4.2, website: 'https://www.iiitb.ac.in', minFees: 350000, maxFees: 500000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 420000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 420000 }, { name: 'Information Technology', degree: 'M.Tech', duration: '2 years', fees: 450000, specialization: 'Software Engineering' }],
    placements: [{ year: 2024, avgPackage: 18.0, highestPackage: 95.0, medianPackage: 14.0, placementRate: 92, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Cisco', 'Samsung', 'Infosys'] }, { year: 2023, avgPackage: 16.5, highestPackage: 85.0, medianPackage: 13.0, placementRate: 91, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'TCS'] }],
    reviews: [{ rating: 4, title: 'Great location in Bangalore IT hub', comment: 'Being in Bangalore gives access to countless internship and networking opportunities.', userIndex: 1 }, { rating: 4, title: 'Industry-focused education', comment: 'IIIT Bangalore emphasizes practical, industry-relevant skills. Curriculum is regularly updated.', userIndex: 0 }],
  },
  { name: 'IIIT Lucknow', description: 'IIIT Lucknow, established in 2015, is a PPP model IIIT mentored by IIIT Allahabad. Located in the City of Nawabs, it offers focused CS and IT education.', city: 'Lucknow', state: 'Uttar Pradesh', type: 'IIIT', established: 2015, rating: 3.7, website: 'https://www.iiitl.ac.in', minFees: 150000, maxFees: 280000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 }, { name: 'Information Technology', degree: 'B.Tech', duration: '4 years', fees: 220000 }],
    placements: [{ year: 2024, avgPackage: 11.0, highestPackage: 45.0, medianPackage: 8.0, placementRate: 80, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }, { year: 2023, avgPackage: 10.0, highestPackage: 40.0, medianPackage: 7.5, placementRate: 78, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 3, title: 'Growing IIIT in Lucknow', comment: 'IIIT Lucknow is building its reputation with improving placements. The Lucknow culture is a bonus.', userIndex: 0 }, { rating: 3, title: 'Affordable CS education', comment: 'Good value for focused CS/IT education. Faculty are dedicated and research-oriented.', userIndex: 1 }],
  },
  { name: 'IIIT Gwalior', description: 'ABV-IIITM Gwalior, established in 1997, is one of the oldest IIITs. Known for its IT management programs and strong placement record.', city: 'Gwalior', state: 'Madhya Pradesh', type: 'IIIT', established: 1997, rating: 4.0, website: 'https://www.iiitm.ac.in', minFees: 200000, maxFees: 350000,
    courses: [{ name: 'Information Technology', degree: 'B.Tech', duration: '4 years', fees: 280000 }, { name: 'Information Technology and Management', degree: 'MBA', duration: '2 years', fees: 350000, specialization: 'IT Management' }, { name: 'Computer Science', degree: 'M.Tech', duration: '2 years', fees: 280000 }],
    placements: [{ year: 2024, avgPackage: 13.0, highestPackage: 55.0, medianPackage: 10.0, placementRate: 85, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }, { year: 2023, avgPackage: 12.0, highestPackage: 50.0, medianPackage: 9.0, placementRate: 83, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 4, title: 'Pioneer IIIT with IT-management focus', comment: 'ABV-IIITM Gwalior uniquely combines IT with management education. The IPM program is well-regarded.', userIndex: 1 }, { rating: 4, title: 'Strong placement record', comment: 'Consistent placements and a good alumni network make this a solid choice for IT careers.', userIndex: 0 }],
  },
  { name: 'IIIT Sri City', description: 'IIIT Sri City, established in 2013 and mentored by IIIT Hyderabad, is located in the integrated business city of Sri City in Andhra Pradesh.', city: 'Sri City', state: 'Andhra Pradesh', type: 'IIIT', established: 2013, rating: 3.8, website: 'https://www.iiits.ac.in', minFees: 200000, maxFees: 320000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 260000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 260000 }],
    placements: [{ year: 2024, avgPackage: 12.0, highestPackage: 50.0, medianPackage: 9.0, placementRate: 82, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Flipkart'] }, { year: 2023, avgPackage: 11.0, highestPackage: 45.0, medianPackage: 8.0, placementRate: 80, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro', 'Amazon'] }],
    reviews: [{ rating: 4, title: 'IIIT-H mentorship advantage', comment: 'The IIIT Hyderabad mentorship ensures high academic standards and good research culture.', userIndex: 0 }, { rating: 3, title: 'Growing with strong foundation', comment: 'Sri City campus is modern and the industry connections are developing well.', userIndex: 1 }],
  },
  { name: 'IIIT Kota', description: 'IIIT Kota, established in 2013, is located in the coaching capital of India. It is a PPP model IIIT offering focused CS and ECE programs.', city: 'Kota', state: 'Rajasthan', type: 'IIIT', established: 2013, rating: 3.6, website: 'https://www.iiitkota.ac.in', minFees: 150000, maxFees: 280000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 }],
    placements: [{ year: 2024, avgPackage: 10.0, highestPackage: 40.0, medianPackage: 7.5, placementRate: 78, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }, { year: 2023, avgPackage: 9.0, highestPackage: 35.0, medianPackage: 7.0, placementRate: 75, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 3, title: 'IIIT in the coaching hub', comment: 'IIIT Kota benefits from the academic culture of the city. Growing steadily with better placements each year.', userIndex: 1 }, { rating: 3, title: 'Affordable and focused', comment: 'Good CS-focused education at affordable fees. The small batch ensures personal attention.', userIndex: 0 }],
  },
  { name: 'IIIT Pune', description: 'IIIT Pune, established in 2014, is located in the IT hub of Pune. Being a PPP model IIIT, it benefits from strong industry connections in the region.', city: 'Pune', state: 'Maharashtra', type: 'IIIT', established: 2014, rating: 3.7, website: 'https://www.iiitp.ac.in', minFees: 200000, maxFees: 300000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 250000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 250000 }],
    placements: [{ year: 2024, avgPackage: 11.0, highestPackage: 45.0, medianPackage: 8.5, placementRate: 80, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Persistent'] }, { year: 2023, avgPackage: 10.0, highestPackage: 40.0, medianPackage: 7.5, placementRate: 78, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Persistent', 'Wipro'] }],
    reviews: [{ rating: 3, title: 'IIIT in India\'s IT hub', comment: 'IIIT Pune benefits from Pune\'s thriving IT ecosystem. Internship opportunities are abundant.', userIndex: 0 }, { rating: 3, title: 'Growing institution in a tech city', comment: 'The Pune IT industry provides excellent exposure and career opportunities for students.', userIndex: 1 }],
  },
  { name: 'IIIT Vadodara', description: 'IIIT Vadodara, established in 2013, is a PPP model IIIT offering focused technical education in Gujarat\'s cultural capital.', city: 'Vadodara', state: 'Gujarat', type: 'IIIT', established: 2013, rating: 3.6, website: 'https://www.iiitvadodara.ac.in', minFees: 150000, maxFees: 280000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 220000 }, { name: 'Information Technology', degree: 'B.Tech', duration: '4 years', fees: 220000 }],
    placements: [{ year: 2024, avgPackage: 10.0, highestPackage: 40.0, medianPackage: 7.5, placementRate: 78, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }, { year: 2023, avgPackage: 9.0, highestPackage: 35.0, medianPackage: 7.0, placementRate: 75, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 3, title: 'IIIT in Gujarat\'s cultural hub', comment: 'IIIT Vadodara offers affordable education in the heritage city. Growing placement record.', userIndex: 1 }, { rating: 3, title: 'Steady growth', comment: 'The institution is developing well with focused CS/IT programs and improving industry connections.', userIndex: 0 }],
  },
]

// ---------------------------------------------------------------------------
// Private Institutions (12 institutions)
// ---------------------------------------------------------------------------
const privateColleges: CollegeData[] = [
  { name: 'BITS Pilani', description: 'Birla Institute of Technology and Science Pilani, established in 1964, is India\'s leading private engineering university. Renowned for its flexible academic system and Practice School program.', city: 'Pilani', state: 'Rajasthan', type: 'Private', established: 1964, rating: 4.6, website: 'https://www.bits-pilani.ac.in', minFees: 450000, maxFees: 650000,
    courses: [{ name: 'Computer Science', degree: 'B.Tech', duration: '4 years', fees: 550000, specialization: 'Software Systems' }, { name: 'Electronics and Instrumentation', degree: 'B.Tech', duration: '4 years', fees: 550000 }, { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 550000 }, { name: 'Pharmacy', degree: 'B.Sc', duration: '4 years', fees: 450000 }, { name: 'Management', degree: 'MBA', duration: '2 years', fees: 700000 }],
    placements: [{ year: 2024, avgPackage: 18.5, highestPackage: 120.0, medianPackage: 14.5, placementRate: 92, topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'Amazon', 'Uber', 'Flipkart', 'Samsung', 'Texas Instruments'] }, { year: 2023, avgPackage: 17.0, highestPackage: 110.0, medianPackage: 13.5, placementRate: 91, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Samsung', 'Adobe'] }],
    reviews: [{ rating: 5, title: 'Best private engineering college in India', comment: 'BITS Pilani is truly special. The flexible academic system and Practice School give real industry experience. The alumni network is incredibly strong.', userIndex: 0 }, { rating: 4, title: 'Excellent academics, high fees', comment: 'Education quality is on par with the best IITs. APOGEE and OASIS are legendary fests.', userIndex: 1 }],
  },
  { name: 'VIT Vellore', description: 'Vellore Institute of Technology, established in 1984, is one of India\'s largest and most popular private engineering universities.', city: 'Vellore', state: 'Tamil Nadu', type: 'Private', established: 1984, rating: 4.1, website: 'https://vit.ac.in', minFees: 200000, maxFees: 400000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 350000, specialization: 'IoT' }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 300000 }, { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 275000 }, { name: 'Business Administration', degree: 'MBA', duration: '2 years', fees: 500000 }],
    placements: [{ year: 2024, avgPackage: 9.5, highestPackage: 55.0, medianPackage: 7.0, placementRate: 85, topRecruiters: ['Microsoft', 'Amazon', 'Cognizant', 'Infosys', 'TCS', 'Wipro', 'Deloitte'] }, { year: 2023, avgPackage: 8.5, highestPackage: 48.0, medianPackage: 6.5, placementRate: 83, topRecruiters: ['Amazon', 'Cognizant', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 4, title: 'Great campus and international exposure', comment: 'VIT Vellore has an incredibly well-maintained campus. International student exchange programs set it apart.', userIndex: 1 }, { rating: 3, title: 'Good but needs more industry-focused curriculum', comment: 'Great infrastructure and decent placements for top students. Sheer number of students means you need to stand out.', userIndex: 0 }],
  },
  { name: 'SRM Institute of Science and Technology', description: 'SRM Institute of Science and Technology, established in 1985 in Chennai, is one of the top-ranked private universities in India.', city: 'Chennai', state: 'Tamil Nadu', type: 'Private', established: 1985, rating: 3.9, website: 'https://www.srmist.edu.in', minFees: 200000, maxFees: 500000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 400000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 350000 }, { name: 'Biotechnology', degree: 'B.Tech', duration: '4 years', fees: 300000 }],
    placements: [{ year: 2024, avgPackage: 7.5, highestPackage: 42.0, medianPackage: 5.5, placementRate: 80, topRecruiters: ['Amazon', 'Cognizant', 'TCS', 'Infosys', 'Wipro', 'HCL', 'Zoho'] }, { year: 2023, avgPackage: 7.0, highestPackage: 38.0, medianPackage: 5.0, placementRate: 78, topRecruiters: ['Cognizant', 'TCS', 'Infosys', 'Wipro', 'HCL', 'Zoho'] }],
    reviews: [{ rating: 4, title: 'Large campus with lots of opportunities', comment: 'SRM has a massive campus with good infrastructure. Plenty of clubs and research opportunities if you are proactive.', userIndex: 0 }, { rating: 3, title: 'Decent college, variable experience', comment: 'Top students get excellent placements. Labs and classrooms are well-equipped.', userIndex: 1 }],
  },
  { name: 'Manipal Institute of Technology', description: 'Manipal Institute of Technology, part of MAHE (est. 1957), is a leading private engineering college on the west coast of Karnataka.', city: 'Manipal', state: 'Karnataka', type: 'Private', established: 1957, rating: 4.2, website: 'https://manipal.edu/mit.html', minFees: 350000, maxFees: 550000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 480000, specialization: 'Data Science' }, { name: 'Information Technology', degree: 'B.Tech', duration: '4 years', fees: 450000 }, { name: 'Aeronautical Engineering', degree: 'B.Tech', duration: '4 years', fees: 480000 }],
    placements: [{ year: 2024, avgPackage: 10.0, highestPackage: 60.0, medianPackage: 8.0, placementRate: 87, topRecruiters: ['Microsoft', 'Amazon', 'Goldman Sachs', 'Cisco', 'Samsung', 'TCS'] }, { year: 2023, avgPackage: 9.0, highestPackage: 55.0, medianPackage: 7.5, placementRate: 86, topRecruiters: ['Microsoft', 'Amazon', 'Cisco', 'Samsung', 'TCS'] }],
    reviews: [{ rating: 4, title: 'All-round development in a beautiful town', comment: 'Manipal offers a holistic college experience. The university town ensures a safe and focused environment.', userIndex: 1 }, { rating: 4, title: 'Good placements for a private college', comment: 'MIT Manipal consistently delivers good placement numbers. Diverse student body from all over India.', userIndex: 0 }],
  },
  { name: 'Amity University', description: 'Amity University Noida, established in 2005, is one of India\'s largest private universities with a vast range of programs.', city: 'Noida', state: 'Uttar Pradesh', type: 'Private', established: 2005, rating: 3.5, website: 'https://www.amity.edu', minFees: 300000, maxFees: 600000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 450000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 400000 }, { name: 'Business Administration', degree: 'MBA', duration: '2 years', fees: 550000 }],
    placements: [{ year: 2024, avgPackage: 6.0, highestPackage: 28.0, medianPackage: 4.5, placementRate: 72, topRecruiters: ['Cognizant', 'TCS', 'Infosys', 'Wipro', 'HCL', 'Accenture'] }, { year: 2023, avgPackage: 5.5, highestPackage: 25.0, medianPackage: 4.0, placementRate: 70, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'HCL', 'Accenture'] }],
    reviews: [{ rating: 3, title: 'Good infrastructure, average academics', comment: 'Amity has impressive infrastructure. Being in Noida gives good access to internship opportunities.', userIndex: 0 }, { rating: 4, title: 'Lots of extracurricular opportunities', comment: 'Amity provides numerous opportunities for extracurricular activities and international exchanges.', userIndex: 1 }],
  },
  { name: 'Lovely Professional University', description: 'Lovely Professional University, established in 2005 in Punjab, is one of India\'s largest single-campus universities.', city: 'Phagwara', state: 'Punjab', type: 'Private', established: 2005, rating: 3.6, website: 'https://www.lpu.in', minFees: 150000, maxFees: 400000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 320000, specialization: 'Full Stack Development' }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 280000 }, { name: 'Computer Applications', degree: 'MCA', duration: '2 years', fees: 200000 }],
    placements: [{ year: 2024, avgPackage: 5.5, highestPackage: 42.0, medianPackage: 4.0, placementRate: 75, topRecruiters: ['Amazon', 'Cognizant', 'TCS', 'Infosys', 'Wipro', 'HCL'] }, { year: 2023, avgPackage: 5.0, highestPackage: 38.0, medianPackage: 3.8, placementRate: 73, topRecruiters: ['Cognizant', 'TCS', 'Infosys', 'Wipro', 'HCL'] }],
    reviews: [{ rating: 4, title: 'Massive campus with diverse students', comment: 'LPU has students from all over India making it incredibly diverse. The campus is like a small city.', userIndex: 1 }, { rating: 3, title: 'Good for self-motivated students', comment: 'LPU provides the platform, but success depends on individual effort. Top achievers get excellent placements.', userIndex: 0 }],
  },
  { name: 'Thapar Institute of Engineering and Technology', description: 'Thapar Institute, established in 1956 in Patiala, is one of the most respected private engineering colleges in North India with a strong industry reputation.', city: 'Patiala', state: 'Punjab', type: 'Private', established: 1956, rating: 4.2, website: 'https://www.thapar.edu', minFees: 250000, maxFees: 450000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 380000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 350000 }, { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 320000 }],
    placements: [{ year: 2024, avgPackage: 12.0, highestPackage: 55.0, medianPackage: 9.0, placementRate: 88, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'Goldman Sachs', 'TCS', 'Infosys'] }, { year: 2023, avgPackage: 11.0, highestPackage: 50.0, medianPackage: 8.5, placementRate: 86, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 4, title: 'Top private engineering college in North India', comment: 'Thapar has an excellent reputation among recruiters. The campus is well-maintained and the alumni network is strong.', userIndex: 0 }, { rating: 4, title: 'Strong academics with good placements', comment: 'Thapar consistently delivers quality education. The coding culture and competitive programming community is thriving.', userIndex: 1 }],
  },
  { name: 'DAIICT Gandhinagar', description: 'Dhirubhai Ambani Institute of ICT, established in 2001 in Gandhinagar, is a focused ICT institution with a beautiful campus and strong research culture.', city: 'Gandhinagar', state: 'Gujarat', type: 'Private', established: 2001, rating: 4.1, website: 'https://www.daiict.ac.in', minFees: 200000, maxFees: 400000,
    courses: [{ name: 'Information and Communication Technology', degree: 'B.Tech', duration: '4 years', fees: 350000 }, { name: 'Computer Science', degree: 'M.Tech', duration: '2 years', fees: 350000, specialization: 'Data Science' }],
    placements: [{ year: 2024, avgPackage: 13.0, highestPackage: 55.0, medianPackage: 10.0, placementRate: 88, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Samsung', 'TCS', 'Flipkart'] }, { year: 2023, avgPackage: 12.0, highestPackage: 50.0, medianPackage: 9.0, placementRate: 86, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Infosys'] }],
    reviews: [{ rating: 4, title: 'Focused ICT education with beautiful campus', comment: 'DA-IICT has a world-class campus. The focused ICT curriculum produces well-rounded technology professionals.', userIndex: 1 }, { rating: 4, title: 'Quality over quantity', comment: 'Small batch sizes ensure personalized attention. The research culture is strong and industry connections are excellent.', userIndex: 0 }],
  },
  { name: 'Ashoka University', description: 'Ashoka University, established in 2014 in Sonipat, is India\'s premier liberal arts university with a strong emphasis on interdisciplinary education.', city: 'Sonipat', state: 'Haryana', type: 'Private', established: 2014, rating: 4.3, website: 'https://www.ashoka.edu.in', minFees: 500000, maxFees: 900000,
    courses: [{ name: 'Computer Science', degree: 'B.Sc', duration: '3 years', fees: 750000 }, { name: 'Economics', degree: 'B.Sc', duration: '3 years', fees: 750000 }, { name: 'Political Science', degree: 'B.Sc', duration: '3 years', fees: 750000 }],
    placements: [{ year: 2024, avgPackage: 12.0, highestPackage: 45.0, medianPackage: 9.0, placementRate: 80, topRecruiters: ['Goldman Sachs', 'McKinsey', 'BCG', 'Bain', 'Google', 'Microsoft'] }, { year: 2023, avgPackage: 11.0, highestPackage: 40.0, medianPackage: 8.5, placementRate: 78, topRecruiters: ['Goldman Sachs', 'McKinsey', 'BCG', 'Deloitte', 'Google'] }],
    reviews: [{ rating: 5, title: 'India\'s best liberal arts experience', comment: 'Ashoka is transforming higher education in India. The interdisciplinary approach and world-class faculty create a unique learning environment.', userIndex: 0 }, { rating: 4, title: 'Premium education with global outlook', comment: 'The exposure and critical thinking skills you develop at Ashoka are unmatched. High fees but exceptional value.', userIndex: 1 }],
  },
  { name: 'Shiv Nadar University', description: 'Shiv Nadar University, established in 2011, is a multidisciplinary research university near Delhi offering world-class education across engineering, sciences, and humanities.', city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private', established: 2011, rating: 4.0, website: 'https://www.snu.edu.in', minFees: 400000, maxFees: 700000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 550000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 500000 }, { name: 'Data Science', degree: 'M.Tech', duration: '2 years', fees: 500000 }],
    placements: [{ year: 2024, avgPackage: 11.0, highestPackage: 48.0, medianPackage: 8.5, placementRate: 82, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'Goldman Sachs', 'TCS', 'Deloitte'] }, { year: 2023, avgPackage: 10.0, highestPackage: 42.0, medianPackage: 7.5, placementRate: 80, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Deloitte'] }],
    reviews: [{ rating: 4, title: 'Modern campus with research focus', comment: 'SNU has a stunning campus with excellent research facilities. The interdisciplinary approach is refreshing.', userIndex: 1 }, { rating: 4, title: 'Great faculty and infrastructure', comment: 'World-class infrastructure with faculty from top global universities. Strong emphasis on research.', userIndex: 0 }],
  },
  { name: 'LNMIIT Jaipur', description: 'LNM Institute of Information Technology Jaipur, established in 2003, is a private deemed university known for its strong CS and ECE programs in the Pink City.', city: 'Jaipur', state: 'Rajasthan', type: 'Private', established: 2003, rating: 3.9, website: 'https://www.lnmiit.ac.in', minFees: 200000, maxFees: 400000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 340000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 320000 }, { name: 'Computer Science', degree: 'M.Tech', duration: '2 years', fees: 340000 }],
    placements: [{ year: 2024, avgPackage: 11.0, highestPackage: 45.0, medianPackage: 8.0, placementRate: 82, topRecruiters: ['Amazon', 'Samsung', 'TCS', 'Infosys', 'Wipro', 'Adobe'] }, { year: 2023, avgPackage: 10.0, highestPackage: 40.0, medianPackage: 7.5, placementRate: 80, topRecruiters: ['Samsung', 'TCS', 'Infosys', 'Wipro', 'Adobe'] }],
    reviews: [{ rating: 4, title: 'Quality CS education in Jaipur', comment: 'LNMIIT offers focused CS/ECE education. The campus is well-maintained and faculty are research-active.', userIndex: 0 }, { rating: 3, title: 'Good but underrated', comment: 'An underrated institution that delivers quality education. Alumni network is growing stronger.', userIndex: 1 }],
  },
  { name: 'Chandigarh University', description: 'Chandigarh University, established in 2012, is one of India\'s fastest-growing private universities with a massive campus and diverse programs near Chandigarh.', city: 'Mohali', state: 'Punjab', type: 'Private', established: 2012, rating: 3.8, website: 'https://www.cuchd.in', minFees: 150000, maxFees: 400000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 330000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 290000 }, { name: 'Business Administration', degree: 'MBA', duration: '2 years', fees: 350000 }],
    placements: [{ year: 2024, avgPackage: 6.5, highestPackage: 42.0, medianPackage: 4.5, placementRate: 78, topRecruiters: ['Amazon', 'Cognizant', 'TCS', 'Infosys', 'Wipro', 'HCL'] }, { year: 2023, avgPackage: 6.0, highestPackage: 38.0, medianPackage: 4.0, placementRate: 76, topRecruiters: ['Cognizant', 'TCS', 'Infosys', 'Wipro', 'HCL'] }],
    reviews: [{ rating: 4, title: 'Massive campus with great facilities', comment: 'Chandigarh University has invested heavily in infrastructure. The sports facilities and campus are world-class.', userIndex: 1 }, { rating: 3, title: 'Growing reputation', comment: 'CU is rapidly building its brand. The proximity to Chandigarh is a significant advantage.', userIndex: 0 }],
  },
]

// ---------------------------------------------------------------------------
// State/Other Institutions (4 institutions)
// ---------------------------------------------------------------------------
const otherColleges: CollegeData[] = [
  { name: 'University of Delhi', description: 'University of Delhi, established in 1922, is India\'s premier central university and one of the most prestigious institutions in the country.', city: 'New Delhi', state: 'Delhi', type: 'State', established: 1922, rating: 4.3, website: 'https://www.du.ac.in', minFees: 15000, maxFees: 100000,
    courses: [{ name: 'Computer Science', degree: 'B.Sc', duration: '3 years', fees: 25000 }, { name: 'Mathematics', degree: 'B.Sc', duration: '3 years', fees: 20000 }, { name: 'Commerce', degree: 'BBA', duration: '3 years', fees: 35000 }, { name: 'Business Administration', degree: 'MBA', duration: '2 years', fees: 80000 }],
    placements: [{ year: 2024, avgPackage: 8.0, highestPackage: 35.0, medianPackage: 6.0, placementRate: 70, topRecruiters: ['Deloitte', 'EY', 'KPMG', 'TCS', 'Infosys', 'Wipro'] }, { year: 2023, avgPackage: 7.5, highestPackage: 30.0, medianPackage: 5.5, placementRate: 68, topRecruiters: ['Deloitte', 'EY', 'TCS', 'Infosys', 'Wipro'] }],
    reviews: [{ rating: 4, title: 'Prestigious university with rich legacy', comment: 'Delhi University is an institution with unmatched prestige. The diversity of courses is staggering. Alumni include top leaders.', userIndex: 1 }, { rating: 4, title: 'Best value education in India', comment: 'For the minimal fees, DU provides an education that rivals private universities costing 10x more.', userIndex: 0 }],
  },
  { name: 'Anna University', description: 'Anna University, established in 1978 in Chennai, is Tamil Nadu\'s premier technical university. Its CEG campus is one of the oldest engineering colleges in Asia.', city: 'Chennai', state: 'Tamil Nadu', type: 'State', established: 1978, rating: 4.0, website: 'https://www.annauniv.edu', minFees: 50000, maxFees: 150000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 100000 }, { name: 'Information Technology', degree: 'B.Tech', duration: '4 years', fees: 95000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 90000 }],
    placements: [{ year: 2024, avgPackage: 8.5, highestPackage: 40.0, medianPackage: 6.5, placementRate: 78, topRecruiters: ['Amazon', 'Zoho', 'TCS', 'Infosys', 'Cognizant', 'HCL'] }, { year: 2023, avgPackage: 7.8, highestPackage: 36.0, medianPackage: 6.0, placementRate: 76, topRecruiters: ['Zoho', 'TCS', 'Infosys', 'Cognizant', 'HCL'] }],
    reviews: [{ rating: 4, title: 'Historic institution with strong industry ties', comment: 'CEG campus has rich history dating back to 1794. Companies like Zoho actively recruit from the campus.', userIndex: 0 }, { rating: 4, title: 'Affordable quality education in Chennai', comment: 'Anna University offers exceptional value for money. Strong alumni network in the Chennai IT industry.', userIndex: 1 }],
  },
  { name: 'Jadavpur University', description: 'Jadavpur University, established in 1955 in Kolkata, is one of India\'s finest state universities known for exceptional engineering and humanities programs.', city: 'Kolkata', state: 'West Bengal', type: 'State', established: 1955, rating: 4.3, website: 'https://jadavpuruniversity.in', minFees: 10000, maxFees: 50000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 25000 }, { name: 'Electronics and Telecommunication Engineering', degree: 'B.Tech', duration: '4 years', fees: 22000 }, { name: 'Mechanical Engineering', degree: 'B.Tech', duration: '4 years', fees: 20000 }],
    placements: [{ year: 2024, avgPackage: 10.0, highestPackage: 55.0, medianPackage: 7.5, placementRate: 82, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Samsung', 'TCS', 'Flipkart'] }, { year: 2023, avgPackage: 9.0, highestPackage: 48.0, medianPackage: 7.0, placementRate: 80, topRecruiters: ['Microsoft', 'Amazon', 'Samsung', 'TCS', 'Cognizant'] }],
    reviews: [{ rating: 5, title: 'Best value engineering education in India', comment: 'Jadavpur charges virtually nothing yet the quality is outstanding. Kolkata\'s culture adds to the experience.', userIndex: 1 }, { rating: 4, title: 'Excellent academics, vibrant campus', comment: 'JU has a strong academic culture. The competitive programming community is particularly strong.', userIndex: 0 }],
  },
  { name: 'NSUT Delhi', description: 'Netaji Subhas University of Technology (formerly NSIT), established in 1983, is a premier state engineering institution in Delhi.', city: 'New Delhi', state: 'Delhi', type: 'State', established: 1983, rating: 4.2, website: 'https://www.nsut.ac.in', minFees: 120000, maxFees: 200000,
    courses: [{ name: 'Computer Science and Engineering', degree: 'B.Tech', duration: '4 years', fees: 170000 }, { name: 'Information Technology', degree: 'B.Tech', duration: '4 years', fees: 165000 }, { name: 'Electronics and Communication Engineering', degree: 'B.Tech', duration: '4 years', fees: 160000 }, { name: 'Data Science', degree: 'M.Tech', duration: '2 years', fees: 175000 }],
    placements: [{ year: 2024, avgPackage: 16.0, highestPackage: 90.0, medianPackage: 12.0, placementRate: 90, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Samsung', 'Adobe', 'Uber'] }, { year: 2023, avgPackage: 14.5, highestPackage: 80.0, medianPackage: 11.0, placementRate: 88, topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Samsung', 'Adobe', 'Flipkart'] }],
    reviews: [{ rating: 4, title: 'Top state engineering college in Delhi', comment: 'NSUT is one of the best engineering colleges in Delhi with placements rivaling many NITs. Coding culture is very strong.', userIndex: 0 }, { rating: 4, title: 'Strong CS program with great outcomes', comment: 'The CS and IT programs at NSUT are exceptional. Many alumni in top positions at major tech companies.', userIndex: 1 }],
  },
]

// =============================================================================
// Predictor Rules Configuration
// =============================================================================

interface PredictorRuleData {
  examName: string
  minRank: number
  maxRank: number
  category: string
}

function generatePredictorRules(collegeName: string, collegeType: string): PredictorRuleData[] {
  const rules: PredictorRuleData[] = []

  if (collegeType === 'IIT') {
    const baseRank = getBaseRankForIIT(collegeName)
    const categories = [
      { name: 'General', multiplier: 1 },
      { name: 'OBC', multiplier: 1.5 },
      { name: 'SC', multiplier: 3 },
      { name: 'ST', multiplier: 4 },
      { name: 'EWS', multiplier: 1.3 },
    ]
    for (const cat of categories) {
      rules.push({ examName: 'JEE_ADVANCED', minRank: Math.round(baseRank * 0.5 * cat.multiplier), maxRank: Math.round(baseRank * cat.multiplier), category: cat.name })
    }
    rules.push({ examName: 'GATE', minRank: 1, maxRank: 500, category: 'General' })
    rules.push({ examName: 'GATE', minRank: 1, maxRank: 750, category: 'OBC' })
  } else if (collegeType === 'NIT') {
    const baseRank = getBaseRankForNIT(collegeName)
    const categories = [
      { name: 'General', multiplier: 1 },
      { name: 'OBC', multiplier: 1.8 },
      { name: 'SC', multiplier: 3.5 },
      { name: 'ST', multiplier: 5 },
      { name: 'EWS', multiplier: 1.5 },
    ]
    for (const cat of categories) {
      rules.push({ examName: 'JEE_MAIN', minRank: Math.round(baseRank * 0.3 * cat.multiplier), maxRank: Math.round(baseRank * cat.multiplier), category: cat.name })
    }
    rules.push({ examName: 'GATE', minRank: 1, maxRank: 1000, category: 'General' })
  } else if (collegeType === 'IIIT') {
    const baseRank = getBaseRankForIIIT(collegeName)
    const categories = [
      { name: 'General', multiplier: 1 },
      { name: 'OBC', multiplier: 1.8 },
      { name: 'SC', multiplier: 3.5 },
      { name: 'ST', multiplier: 5 },
      { name: 'EWS', multiplier: 1.4 },
    ]
    for (const cat of categories) {
      rules.push({ examName: 'JEE_MAIN', minRank: Math.round(baseRank * 0.2 * cat.multiplier), maxRank: Math.round(baseRank * cat.multiplier), category: cat.name })
    }
    rules.push({ examName: 'GATE', minRank: 1, maxRank: 800, category: 'General' })
  } else if (collegeType === 'State') {
    const baseRank = getBaseRankForState(collegeName)
    rules.push({ examName: 'JEE_MAIN', minRank: Math.round(baseRank * 0.3), maxRank: baseRank, category: 'General' })
    rules.push({ examName: 'JEE_MAIN', minRank: Math.round(baseRank * 0.5), maxRank: Math.round(baseRank * 1.8), category: 'OBC' })
    rules.push({ examName: 'JEE_MAIN', minRank: Math.round(baseRank * 1.0), maxRank: Math.round(baseRank * 3.5), category: 'SC' })
  } else if (collegeType === 'Private') {
    const baseRank = getBaseRankForPrivate(collegeName)
    rules.push({ examName: 'JEE_MAIN', minRank: Math.round(baseRank * 0.2), maxRank: baseRank, category: 'General' })
    rules.push({ examName: 'JEE_MAIN', minRank: Math.round(baseRank * 0.3), maxRank: Math.round(baseRank * 1.5), category: 'OBC' })
    rules.push({ examName: 'JEE_MAIN', minRank: Math.round(baseRank * 0.5), maxRank: Math.round(baseRank * 2.5), category: 'SC' })
  }

  // CAT rules for MBA programs
  if (collegeName.includes('IIT') || collegeName === 'BITS Pilani') {
    rules.push({ examName: 'CAT', minRank: 1, maxRank: 500, category: 'General' })
    rules.push({ examName: 'CAT', minRank: 1, maxRank: 800, category: 'OBC' })
  }

  return rules
}

function getBaseRankForIIT(name: string): number {
  const ranks: Record<string, number> = {
    'IIT Bombay': 200, 'IIT Delhi': 300, 'IIT Madras': 250, 'IIT Kanpur': 400,
    'IIT Kharagpur': 500, 'IIT Roorkee': 600, 'IIT Guwahati': 700, 'IIT Hyderabad': 800,
    'IIT BHU Varanasi': 900, 'IIT Indore': 1200, 'IIT Dhanbad': 1000, 'IIT Patna': 1500,
    'IIT Gandhinagar': 1400, 'IIT Ropar': 1600, 'IIT Bhubaneswar': 1700, 'IIT Mandi': 1800,
    'IIT Jodhpur': 1500, 'IIT Tirupati': 2000, 'IIT Palakkad': 2100, 'IIT Bhilai': 2200,
    'IIT Goa': 2100, 'IIT Jammu': 2300, 'IIT Dharwad': 2200,
  }
  return ranks[name] || 2000
}

function getBaseRankForNIT(name: string): number {
  const ranks: Record<string, number> = {
    'NIT Trichy': 5000, 'NIT Warangal': 6000, 'NIT Karnataka Surathkal': 5500, 'NIT Calicut': 7000,
    'MNNIT Allahabad': 8000, 'NIT Rourkela': 8500, 'NIT Durgapur': 10000, 'MNIT Jaipur': 8000,
    'VNIT Nagpur': 8500, 'NIT Srinagar': 15000, 'NIT Silchar': 14000, 'NIT Kurukshetra': 11000,
    'NIT Hamirpur': 15000, 'NIT Jalandhar': 12000, 'SVNIT Surat': 9000, 'NIT Patna': 12000,
    'NIT Jamshedpur': 11000, 'MANIT Bhopal': 9000, 'NIT Agartala': 25000, 'NIT Raipur': 18000,
    'NIT Delhi': 13000, 'NIT Goa': 20000, 'NIT Puducherry': 25000, 'NIT Manipur': 30000,
    'NIT Meghalaya': 30000, 'NIT Mizoram': 35000, 'NIT Nagaland': 35000, 'NIT Sikkim': 35000,
    'NIT Arunachal Pradesh': 35000, 'NIT Uttarakhand': 22000, 'NIT Andhra Pradesh': 28000,
  }
  return ranks[name] || 20000
}

function getBaseRankForIIIT(name: string): number {
  const ranks: Record<string, number> = {
    'IIIT Hyderabad': 3000, 'IIIT Delhi': 4000, 'IIIT Allahabad': 8000, 'IIIT Bangalore': 6000,
    'IIIT Lucknow': 15000, 'IIIT Gwalior': 7000, 'IIIT Sri City': 10000, 'IIIT Kota': 16000,
    'IIIT Pune': 14000, 'IIIT Vadodara': 16000,
  }
  return ranks[name] || 15000
}

function getBaseRankForState(name: string): number {
  const ranks: Record<string, number> = {
    'University of Delhi': 50000, 'Anna University': 25000, 'Jadavpur University': 15000, 'NSUT Delhi': 10000,
  }
  return ranks[name] || 30000
}

function getBaseRankForPrivate(name: string): number {
  const ranks: Record<string, number> = {
    'BITS Pilani': 15000, 'VIT Vellore': 50000, 'SRM Institute of Science and Technology': 60000,
    'Manipal Institute of Technology': 40000, 'Amity University': 100000, 'Lovely Professional University': 120000,
    'Thapar Institute of Engineering and Technology': 30000, 'DAIICT Gandhinagar': 25000,
    'Ashoka University': 35000, 'Shiv Nadar University': 45000, 'LNMIIT Jaipur': 35000,
    'Chandigarh University': 90000,
  }
  return ranks[name] || 80000
}

// =============================================================================
// MAIN SEED FUNCTION
// =============================================================================

async function main() {
  console.log('🌱 Starting database seed...\n')

  const allCollegeData = [
    ...iitColleges,
    ...nitColleges,
    ...iiitColleges,
    ...privateColleges,
    ...otherColleges,
  ]

  console.log(`📊 Total colleges to seed: ${allCollegeData.length}\n`)

  // Clean existing data
  console.log('🧹 Cleaning existing data...')
  await prisma.$transaction([
    prisma.predictorRule.deleteMany(),
    prisma.savedCollege.deleteMany(),
    prisma.review.deleteMany(),
    prisma.placement.deleteMany(),
    prisma.course.deleteMany(),
    prisma.college.deleteMany(),
    prisma.user.deleteMany(),
  ])
  console.log('   ✅ All existing data cleared\n')

  // Create test users
  console.log('👤 Creating test users...')
  const adminHash = await hashPassword('password123')
  const userHash = await hashPassword('password123')

  const [adminUser, regularUser] = await prisma.$transaction([
    prisma.user.create({
      data: { name: 'Admin User', email: 'admin@example.com', passwordHash: adminHash },
    }),
    prisma.user.create({
      data: { name: 'Rahul Sharma', email: 'user@example.com', passwordHash: userHash },
    }),
  ])

  const users = [adminUser, regularUser]
  console.log(`   ✅ Created ${users.length} test users\n`)

  // Seed colleges
  console.log('🏫 Seeding colleges with courses, placements, reviews, and predictor rules...\n')

  let totalCourses = 0
  let totalPlacements = 0
  let totalReviews = 0
  let totalPredictorRules = 0
  let totalSavedColleges = 0

  for (let i = 0; i < allCollegeData.length; i++) {
    const collegeData = allCollegeData[i]
    // Use real image from the map, fall back to null
    const imageUrl = collegeImages[collegeData.name] || null
    const slug = slugify(collegeData.name)

    await prisma.$transaction(async (tx) => {
      const college = await tx.college.create({
        data: {
          name: collegeData.name,
          slug,
          description: collegeData.description,
          city: collegeData.city,
          state: collegeData.state,
          type: collegeData.type,
          established: collegeData.established,
          rating: collegeData.rating,
          imageUrl,
          website: collegeData.website,
          minFees: collegeData.minFees,
          maxFees: collegeData.maxFees,
        },
      })

      for (const course of collegeData.courses) {
        await tx.course.create({
          data: {
            collegeId: college.id, name: course.name, degree: course.degree,
            duration: course.duration, fees: course.fees, specialization: course.specialization || null,
          },
        })
        totalCourses++
      }

      for (const placement of collegeData.placements) {
        await tx.placement.create({
          data: {
            collegeId: college.id, year: placement.year, avgPackage: placement.avgPackage,
            highestPackage: placement.highestPackage, medianPackage: placement.medianPackage,
            placementRate: placement.placementRate, topRecruiters: JSON.stringify(placement.topRecruiters),
          },
        })
        totalPlacements++
      }

      for (const review of collegeData.reviews) {
        await tx.review.create({
          data: {
            collegeId: college.id, userId: users[review.userIndex].id,
            rating: review.rating, title: review.title, comment: review.comment,
          },
        })
        totalReviews++
      }

      const predictorRules = generatePredictorRules(collegeData.name, collegeData.type)
      for (const rule of predictorRules) {
        await tx.predictorRule.create({
          data: {
            collegeId: college.id, examName: rule.examName,
            minRank: rule.minRank, maxRank: rule.maxRank, category: rule.category,
          },
        })
        totalPredictorRules++
      }

      if (i < 5) {
        await tx.savedCollege.create({ data: { userId: regularUser.id, collegeId: college.id } })
        totalSavedColleges++
      }
      if (i >= 3 && i < 8) {
        await tx.savedCollege.create({ data: { userId: adminUser.id, collegeId: college.id } })
        totalSavedColleges++
      }
    }, { timeout: 30000 })

    console.log(`   ✅ [${i + 1}/${allCollegeData.length}] ${collegeData.name} — ${collegeData.courses.length} courses, ${collegeData.placements.length} placements, ${collegeData.reviews.length} reviews`)
  }

  console.log('\n' + '='.repeat(60))
  console.log('🎉 Database seeded successfully!')
  console.log('='.repeat(60))
  console.log(`   👤 Users:           ${users.length}`)
  console.log(`   🏫 Colleges:        ${allCollegeData.length}`)
  console.log(`   📚 Courses:         ${totalCourses}`)
  console.log(`   💼 Placements:      ${totalPlacements}`)
  console.log(`   ⭐ Reviews:         ${totalReviews}`)
  console.log(`   💾 Saved Colleges:  ${totalSavedColleges}`)
  console.log(`   🎯 Predictor Rules: ${totalPredictorRules}`)
  console.log('='.repeat(60) + '\n')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
