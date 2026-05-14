import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ClipboardCheck,
  Database,
  Download,
  Eye,
  FileText,
  Filter,
  Globe2,
  HardDrive,
  History,
  Info,
  Layers,
  Map,
  MapPin,
  Plus,
  Route,
  Search,
  Shield,
  Upload,
  X,
  Zap,
} from 'lucide-react';

const COUNTRIES = {
  Nigeria: {
    short: 'NG',
    agency: 'Federal Republic',
    subAgency: 'Infrastructure Dept',
    flag: ['#008751', '#FFFFFF', '#008751'],
    emblem: '♛',
    regions: ['Rivers', 'Lagos', 'FCT', 'Delta', 'Edo', 'Kano'],
  },
  Kenya: {
    short: 'KE',
    agency: 'Republic of Kenya',
    subAgency: 'Infrastructure Authority',
    flag: ['#000000', '#BB0000', '#006600'],
    emblem: '⚖',
    regions: ['Nairobi', 'Mombasa', 'Kiambu', 'Nakuru'],
  },
  Ethiopia: {
    short: 'ET',
    agency: 'Federal Democratic Republic',
    subAgency: 'Urban Infrastructure',
    flag: ['#078930', '#FCDD09', '#DA121A'],
    emblem: '✦',
    regions: ['Addis Ababa', 'Oromia', 'Amhara'],
  },
  Egypt: {
    short: 'EG',
    agency: 'Arab Republic of Egypt',
    subAgency: 'Digital Infrastructure',
    flag: ['#CE1126', '#FFFFFF', '#000000'],
    emblem: '◆',
    regions: ['Greater Cairo', 'Alexandria', 'Giza'],
  },
  Ghana: {
    short: 'GH',
    agency: 'Republic of Ghana',
    subAgency: 'Works & Housing',
    flag: ['#CE1126', '#FCD116', '#006B3F'],
    emblem: '★',
    regions: ['Greater Accra', 'Ashanti', 'Western'],
  },
};

const WORK_CLASSIFICATIONS = [
  'Drainage Construction',
  'Road Rehabilitation',
  'Utility Duct Installation',
  'Foundation / Piling',
  'Fiber Deployment',
  'Water / Sewer Works',
  'Power Works',
];

const INTAKE_AGENCIES = [
  'Rivers Permit Office',
  'Lagos Infrastructure Coordination Office',
  'Abuja ROW Coordination Desk',
  'NCC Regional Oversight Desk',
  'National Fiber Corridor Desk',
];

const DEPARTMENT_OFFICERS = {
  'Rivers Permit Office': [
    { name: 'R. Okafor', id: 'RIV-INT-042' },
    { name: 'C. Wike', id: 'RIV-INT-088' },
  ],
  'Lagos Infrastructure Coordination Office': [
    { name: 'A. Bello', id: 'LAG-INT-118' },
    { name: 'F. Balogun', id: 'LAG-INT-204' },
  ],
  'Abuja ROW Coordination Desk': [
    { name: 'M. Danladi', id: 'ABJ-INT-073' },
    { name: 'S. Ibrahim', id: 'ABJ-INT-112' },
  ],
  'NCC Regional Oversight Desk': [
    { name: 'T. Adeyemi', id: 'NCC-REV-025' },
    { name: 'N. Usman', id: 'NCC-REV-061' },
  ],
  'National Fiber Corridor Desk': [
    { name: 'E. Nwosu', id: 'NFC-INT-031' },
    { name: 'P. Musa', id: 'NFC-INT-066' },
  ],
};

const OFFICERS = Object.values(DEPARTMENT_OFFICERS).flat();

const REQUEST_CHANNELS = [
  'Assisted Intake',
  'Online Portal',
  'Email Submission',
  'Field Office Walk-in',
  'API / System Intake',
];

const REQUESTER_TYPES = [
  'Contractor',
  'Utility Owner',
  'Government Agency',
  'Engineering Consultant',
  'Field Vendor',
  'Other',
];

const MARKET_REGIONS = [
  'Nigeria / Rivers',
  'Nigeria / Lagos',
  'Nigeria / FCT',
  'Nigeria / Ogun',
  'Nigeria / Kano',
];

const WORK_AREA_TYPES = ['Linear Corridor', 'Point Excavation', 'Area / Polygon Work'];

const CORRIDOR_SUGGESTIONS = [
  'Garrison Junction to Elekahia Road, Port Harcourt',
  'Ikeja CBD to Maryland Exchange',
  'Abuja Central Corridor Segment A',
  'Lekki Phase 1 Fiber Corridor',
  'Kano Metro Ring Segment 2',
];

const SIDE_OF_ROAD_OPTIONS = [
  'Unknown',
  'Northbound',
  'Southbound',
  'Eastbound',
  'Westbound',
  'Both sides',
  'Median / centerline',
  'Not applicable',
];

const SCREENING_BUFFER_OPTIONS = ['Standard buffer', 'Side-specific buffer', 'Wider buffer applied', 'Narrow point buffer', 'Manual review buffer'];

const LOCATION_SOURCE_OPTIONS = [
  'Assisted intake / permit reference',
  'Assisted intake / permit entry',
  'Online portal submission',
  'GIS import',
  'Field office walk-in',
  'API / system intake',
];

const START_WINDOW_OPTIONS = [
  'Within 48 hours',
  'Within 7 days',
  'Within 14 days',
  'Within 21 days',
  'More than 21 days',
];

const TRAFFIC_IMPACT_OPTIONS = [
  'No traffic impact',
  'Shoulder / verge work',
  'Single-lane managed works',
  'Multi-lane restriction',
  'Full road closure',
  'Emergency works',
];

const STEP_COMPLETENESS = {
  1: 15,
  2: 25,
  3: 40,
  4: 55,
  5: 70,
  6: 82,
  7: 90,
  8: 96,
  9: 96,
  10: 100,
};

const STEPS = [
  'Intake Authority',
  'Requester Details',
  'CBYD Eligibility',
  'Work Classification',
  'Location Capture',
  'Method & Dimensions',
  'Schedule',
  'Documents',
  'Review',
  'Submitted to DICRI',
];

const INTAKES = [
  {
    id: 'INT-042',
    packetId: 'CBYD-INT-2026-00481',
    requester: 'Delta Civil Works Ltd.',
    requesterType: 'Contractor',
    workCategory: 'Drainage Construction',
    classifications: ['Drainage Construction', 'Road Rehabilitation'],
    location: 'Garrison Junction to Elekahia Road, Port Harcourt',
    state: 'Rivers',
    country: 'Nigeria',
    channel: 'Assisted Intake',
    completeness: 87,
    status: 'Draft Intake Request',
    workAreaType: 'Linear Corridor',
    groundDisturbance: 'Yes',
    warning: 'Side of road unknown; wider screening buffer may be applied.',
    estimatedLength: '2.4 km',
    screeningBuffer: 'Wider buffer applied',
    sideOfRoad: 'Unknown',
    locationSource: 'Assisted intake / permit entry',
    corridorStartPoint: 'Garrison Junction',
    corridorEndPoint: 'Elekahia Road',
    corridorCity: 'Port Harcourt',
    corridorLga: 'Port Harcourt',
    sketchFileName: '',
    sketchUnavailable: false,
    likelyOwners: [
      { name: 'State Fiber Agency', type: 'Fiber', response: 'Pending', sla: '12h', risk: 'High', reason: 'Direct corridor conflict' },
      { name: 'Municipal Sewer Department', type: 'Sewer', response: 'Required', sla: '12h', risk: 'High', reason: 'Crosses screening buffer' },
      { name: 'Gas Utility', type: 'Gas', response: 'Notified', sla: '24h', risk: 'Low', reason: 'Nearby, outside conflict zone' },
      { name: 'Water Corporation', type: 'Water', response: 'Acknowledged', sla: 'Closed', risk: 'Low', reason: 'Offset from declared corridor' },
    ],
    permitRef: 'DD452-234',
    contact: 'Emeka Nwosu',
    email: 'emeka.nwosu@deltacivil.demo',
    phone: '+234 802 123 4567',
    expectedStart: '2026-05-14',
    expectedCompletion: '2026-05-21',
    agency: 'Rivers State Permit Office',
    officer: 'R. Okafor',
    officerId: 'RIV-INT-042',
    method: 'Open trenching',
    depthRange: '0.6 m - 1.2 m',
    lengthRange: '0.5 km - 1 km',
    surfaceType: 'Asphalt roadway / shoulder',
    equipmentClass: 'Light excavator + manual finish',
    trafficImpact: 'Single-lane managed works',
    startWindow: 'Within 7 days',
    restoration: 'Temporary reinstatement then permanent patch',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Linear Corridor', depthKnown: 'No', ownersNotified: 'Partial' },
    attachments: 2,
  },
  {
    id: 'INT-041',
    packetId: 'CBYD-INT-2026-00479',
    requester: 'Niger Drainage Services',
    requesterType: 'Contractor',
    workCategory: 'Water / Sewer Works',
    classifications: ['Water / Sewer Works', 'Drainage Construction'],
    location: 'Okpanam Road drainage outfall, Asaba',
    state: 'Delta',
    country: 'Nigeria',
    channel: 'Public Portal',
    completeness: 54,
    status: 'Needs Clarification',
    workAreaType: 'Point Excavation',
    groundDisturbance: 'Yes',
    warning: 'Permit reference and route sketch are incomplete.',
    likelyOwners: [
      { name: 'Water Corporation', type: 'Water', response: 'Pending', sla: '20h', risk: 'Medium' },
      { name: 'Gas Pipeline Operator', type: 'Gas', response: 'Notified', sla: 'Closed', risk: 'High' },
      { name: 'Road Authority', type: 'Road', response: 'Pending', sla: '14h', risk: 'Medium' },
    ],
    permitRef: 'DTA-CV-1190',
    contact: 'Ifeoma Udo',
    email: 'ifeoma.udo@nigerdrainage.demo',
    phone: '+234 803 220 1188',
    expectedStart: '2026-05-20',
    expectedCompletion: '2026-05-28',
    agency: 'Delta Permit Desk',
    officer: 'M. Aghogho',
    officerId: 'DTA-INT-041',
    method: 'Vacuum excavation',
    depthRange: '1.2 m - 2 m',
    lengthRange: 'Under 100 m',
    surfaceType: 'Road shoulder',
    equipmentClass: 'Vacuum truck + hand tools',
    trafficImpact: 'Shoulder closure',
    startWindow: '8-14 days',
    restoration: 'Same-day reinstatement',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Point Excavation', depthKnown: 'Yes', ownersNotified: 'No' },
    attachments: 1,
  },
  {
    id: 'INT-040',
    packetId: 'CBYD-INT-2026-00472',
    requester: 'City Roads Unit',
    requesterType: 'Government Unit',
    workCategory: 'Road Rehabilitation',
    classifications: ['Road Rehabilitation', 'Power Works'],
    location: 'Ring Road resurfacing zone, Benin City',
    state: 'Edo',
    country: 'Nigeria',
    channel: 'Assisted Intake',
    completeness: 93,
    status: 'Ready for Review',
    workAreaType: 'Linear Corridor',
    groundDisturbance: 'Yes',
    warning: 'Power owner response pending but packet is reviewable.',
    likelyOwners: [
      { name: 'Power Distribution Company', type: 'Power', response: 'Pending', sla: '10h', risk: 'Medium' },
      { name: 'State Fiber Agency', type: 'Fiber', response: 'Acknowledged', sla: 'Closed', risk: 'Low' },
      { name: 'Road Authority', type: 'Road', response: 'Internal', sla: 'Closed', risk: 'Low' },
    ],
    permitRef: 'BEN-RD-0841',
    contact: 'Osaze Igbinosa',
    email: 'osaze.igbinosa@cityroads.demo',
    phone: '+234 805 404 8811',
    expectedStart: '2026-05-18',
    expectedCompletion: '2026-06-02',
    agency: 'Edo Works Permit Office',
    officer: 'A. Ehigie',
    officerId: 'EDO-INT-040',
    method: 'Road cutting / milling',
    depthRange: '0.3 m - 0.6 m',
    lengthRange: '1 km - 3 km',
    surfaceType: 'Paved arterial road',
    equipmentClass: 'Road saw + milling machine',
    trafficImpact: 'Partial carriageway closure',
    startWindow: 'Within 7 days',
    restoration: 'Permanent asphalt reinstatement',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Linear Corridor', depthKnown: 'Yes', ownersNotified: 'Partial' },
    attachments: 4,
  },
  {
    id: 'INT-039',
    packetId: 'CBYD-INT-2026-00463',
    requester: 'East Africa Fibre Build Ltd.',
    requesterType: 'Utility Contractor',
    workCategory: 'Fiber Deployment',
    classifications: ['Fiber Deployment', 'Utility Duct Installation'],
    location: 'Waiyaki Way to Westlands exchange, Nairobi',
    state: 'Nairobi',
    country: 'Kenya',
    channel: 'Public Portal',
    completeness: 78,
    status: 'Ready for Review',
    workAreaType: 'Linear Corridor',
    groundDisturbance: 'Yes',
    warning: 'Owner notification package ready for DICRI review.',
    likelyOwners: [
      { name: 'Road Authority', type: 'Road', response: 'Acknowledged', sla: 'Closed', risk: 'Low' },
      { name: 'Power Distribution Company', type: 'Power', response: 'Pending', sla: '16h', risk: 'Medium' },
      { name: 'Water Corporation', type: 'Water', response: 'Pending', sla: '22h', risk: 'Medium' },
    ],
    permitRef: 'NRB-FB-4430',
    contact: 'Achieng Otieno',
    email: 'achieng.otieno@eafibre.demo',
    phone: '+254 711 555 203',
    expectedStart: '2026-05-26',
    expectedCompletion: '2026-06-10',
    agency: 'Nairobi Infrastructure Authority',
    officer: 'P. Mwangi',
    officerId: 'KEN-INT-039',
    method: 'Micro-trenching',
    depthRange: '0.3 m - 0.6 m',
    lengthRange: '1 km - 3 km',
    surfaceType: 'Urban road reserve',
    equipmentClass: 'Micro-trencher',
    trafficImpact: 'Off-peak shoulder works',
    startWindow: '15-30 days',
    restoration: 'Permanent reinstatement',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Linear Corridor', depthKnown: 'Yes', ownersNotified: 'Partial' },
    attachments: 3,
  },
  {
    id: 'INT-038',
    packetId: 'CBYD-INT-2026-00451',
    requester: 'Addis Utility Works',
    requesterType: 'Utility Provider',
    workCategory: 'Power Works',
    classifications: ['Power Works', 'Foundation / Piling'],
    location: 'Bole Road feeder upgrade, Addis Ababa',
    state: 'Addis Ababa',
    country: 'Ethiopia',
    channel: 'Assisted Intake',
    completeness: 68,
    status: 'Needs Clarification',
    workAreaType: 'Area / Polygon Work',
    groundDisturbance: 'Yes',
    warning: 'Work boundary needs a cleaner polygon and method statement.',
    likelyOwners: [
      { name: 'Power Distribution Company', type: 'Power', response: 'Internal', sla: 'Closed', risk: 'Low' },
      { name: 'Municipal Drainage Department', type: 'Drainage', response: 'Pending', sla: '24h', risk: 'Medium' },
      { name: 'State Fiber Agency', type: 'Fiber', response: 'Pending', sla: '20h', risk: 'Medium' },
    ],
    permitRef: 'ADD-PW-9007',
    contact: 'Mekdes Alemu',
    email: 'mekdes.alemu@addisutility.demo',
    phone: '+251 911 205 441',
    expectedStart: '2026-06-04',
    expectedCompletion: '2026-06-25',
    agency: 'Addis Ababa Infrastructure Desk',
    officer: 'T. Bekele',
    officerId: 'ETH-INT-038',
    method: 'Piling / foundation excavation',
    depthRange: 'Over 2 m',
    lengthRange: 'Area / compound works',
    surfaceType: 'Mixed paved and unpaved',
    equipmentClass: 'Piling rig + excavator',
    trafficImpact: 'Localized diversion',
    startWindow: '15-30 days',
    restoration: 'Engineered reinstatement',
    eligibility: { ground: 'Yes', row: 'Near ROW', corridor: 'Area / Polygon Work', depthKnown: 'Partial', ownersNotified: 'No' },
    attachments: 2,
  },
  {
    id: 'INT-037',
    packetId: 'CBYD-INT-2026-00437',
    requester: 'Accra Water Renewal Program',
    requesterType: 'Government Unit',
    workCategory: 'Water / Sewer Works',
    classifications: ['Water / Sewer Works', 'Road Rehabilitation'],
    location: 'Ring Road East utility renewal, Accra',
    state: 'Greater Accra',
    country: 'Ghana',
    channel: 'Assisted Intake',
    completeness: 91,
    status: 'Ready for Review',
    workAreaType: 'Linear Corridor',
    groundDisturbance: 'Yes',
    warning: 'Gas operator response window approaching deadline.',
    likelyOwners: [
      { name: 'Water Corporation', type: 'Water', response: 'Internal', sla: 'Closed', risk: 'Low' },
      { name: 'Gas Pipeline Operator', type: 'Gas', response: 'Pending', sla: '8h', risk: 'High' },
      { name: 'Road Authority', type: 'Road', response: 'Acknowledged', sla: 'Closed', risk: 'Low' },
      { name: 'State Fiber Agency', type: 'Fiber', response: 'Pending', sla: '18h', risk: 'Medium' },
    ],
    permitRef: 'ACC-WT-6612',
    contact: 'Ama Mensah',
    email: 'ama.mensah@accrawater.demo',
    phone: '+233 24 404 6612',
    expectedStart: '2026-05-30',
    expectedCompletion: '2026-06-15',
    agency: 'Greater Accra Works Desk',
    officer: 'K. Boateng',
    officerId: 'GHA-INT-037',
    method: 'Open trenching',
    depthRange: '1.2 m - 2 m',
    lengthRange: '0.5 km - 1 km',
    surfaceType: 'Paved urban road',
    equipmentClass: 'Excavator + compactor',
    trafficImpact: 'Managed lane closure',
    startWindow: '8-14 days',
    restoration: 'Permanent road reinstatement',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Linear Corridor', depthKnown: 'Yes', ownersNotified: 'Partial' },
    attachments: 5,
  },
  {
    id: 'INT-036',
    packetId: 'CBYD-INT-2026-00420',
    requester: 'Cairo Civil Renewal Office',
    requesterType: 'Government Unit',
    workCategory: 'Road Rehabilitation',
    classifications: ['Road Rehabilitation', 'Utility Duct Installation'],
    location: 'Nasr City service corridor, Greater Cairo',
    state: 'Greater Cairo',
    country: 'Egypt',
    channel: 'Assisted Intake',
    completeness: 76,
    status: 'Draft Intake Request',
    workAreaType: 'Linear Corridor',
    groundDisturbance: 'Yes',
    warning: 'Likely asset-owner list requires confirmation.',
    likelyOwners: [
      { name: 'Road Authority', type: 'Road', response: 'Internal', sla: 'Closed', risk: 'Low' },
      { name: 'Power Distribution Company', type: 'Power', response: 'Pending', sla: '24h', risk: 'Medium' },
      { name: 'Water Corporation', type: 'Water', response: 'Pending', sla: '24h', risk: 'Medium' },
    ],
    permitRef: 'CAI-RD-5094',
    contact: 'Nour Hassan',
    email: 'nour.hassan@cairorenewal.demo',
    phone: '+20 10 5550 9941',
    expectedStart: '2026-06-08',
    expectedCompletion: '2026-06-30',
    agency: 'Greater Cairo Corridor Desk',
    officer: 'M. Fathy',
    officerId: 'EGY-INT-036',
    method: 'Road cutting / milling',
    depthRange: '0.6 m - 1.2 m',
    lengthRange: '1 km - 3 km',
    surfaceType: 'Paved arterial road',
    equipmentClass: 'Road saw + milling machine',
    trafficImpact: 'Partial carriageway closure',
    startWindow: '15-30 days',
    restoration: 'Permanent asphalt reinstatement',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Linear Corridor', depthKnown: 'Partial', ownersNotified: 'No' },
    attachments: 2,
  },
];

const NOTIFICATIONS = [
  { id: 'N-1', intakeId: 'INT-037', title: 'Owner response window approaching deadline', body: 'Gas Pipeline Operator response is due within 8 hours.', severity: 'High' },
  { id: 'N-2', intakeId: 'INT-041', title: 'Intake clarification required', body: 'Permit reference and route sketch remain incomplete.', severity: 'Medium' },
  { id: 'N-3', intakeId: 'INT-040', title: 'CBYD screening ready for DICRI review', body: 'Packet has sufficient completeness for handoff review.', severity: 'Low' },
];

const REGULATOR_ROWS = [
  {
    permitNumber: 'RIV-PER-2026-041',
    ticket: 'CBYD-RIV-00042',
    submittedBy: 'R. Okafor',
    officerId: 'RIV-INT-042',
    agency: 'Rivers Permit Office',
    market: 'Nigeria / Rivers',
    corridor: 'Garrison Junction to Elekahia Road',
    conflicts: 4,
    owners: ['Fiber Agency', 'Water Corporation', 'Power Distribution Co.', 'Drainage Dept.'],
    notificationStatus: '3 acknowledged / 1 pending',
    sla: 'Warning',
    status: 'Under conflict review',
    submittedDate: '2026-05-10 10:42',
    feeBearing: 'Yes',
  },
  {
    permitNumber: 'LAG-PER-2026-118',
    ticket: 'CBYD-LAG-00118',
    submittedBy: 'A. Bello',
    officerId: 'LAG-INT-118',
    agency: 'Lagos Infrastructure Coordination Office',
    market: 'Nigeria / Lagos',
    corridor: 'Ikeja CBD to Maryland Exchange',
    conflicts: 2,
    owners: ['Equinox Telecom', 'Water Corporation'],
    notificationStatus: '2 acknowledged',
    sla: 'On Track',
    status: 'Cleared for conditional proceed',
    submittedDate: '2026-05-09 14:20',
    feeBearing: 'Yes',
  },
  {
    permitNumber: 'ABJ-PER-2026-073',
    ticket: 'CBYD-ABJ-00073',
    submittedBy: 'M. Danladi',
    officerId: 'ABJ-INT-073',
    agency: 'Abuja ROW Coordination Desk',
    market: 'Nigeria / FCT',
    corridor: 'Central Business District Segment A',
    conflicts: 5,
    owners: ['Fiber Agency', 'Gas Utility', 'Power Distribution Co.', 'Water Board', 'Transport Authority'],
    notificationStatus: '4 acknowledged / 1 escalated',
    sla: 'Exception',
    status: 'Escalated to regulator review',
    submittedDate: '2026-05-08 09:15',
    feeBearing: 'Yes',
  },
  {
    permitNumber: 'NFC-PER-2026-031',
    ticket: 'CBYD-NFC-00031',
    submittedBy: 'E. Nwosu',
    officerId: 'NFC-INT-031',
    agency: 'National Fiber Corridor Desk',
    market: 'Nigeria / Kano',
    corridor: 'Kano Metro Ring Segment 2',
    conflicts: 1,
    owners: ['State Fiber Agency'],
    notificationStatus: 'Pending',
    sla: 'On Track',
    status: 'Awaiting owner response',
    submittedDate: '2026-05-07 16:35',
    feeBearing: 'Yes',
  },
];

const REGULATOR_WINDOW_OPTIONS = ['Last 30 days', 'Last 60 days', 'Last 90 days', 'All time'];

const REGULATOR_DATE_OPTIONS = ['Last 30 Days', 'Last 90 Days', 'Custom'];

const STATE_LGAS = {
  'All States': ['All LGAs'],
  Rivers: ['All LGAs', 'Port Harcourt', 'Obio-Akpor', 'Eleme'],
  Lagos: ['All LGAs', 'Ikeja', 'Eti-Osa', 'Lagos Mainland'],
  FCT: ['All LGAs', 'Abuja Municipal', 'Gwagwalada', 'Bwari'],
  Kano: ['All LGAs', 'Kano Municipal', 'Fagge', 'Nasarawa'],
  Oyo: ['All LGAs', 'Ibadan North', 'Ibadan South-West', 'Ogbomosho North'],
  Ogun: ['All LGAs', 'Abeokuta South', 'Ifo', 'Sagamu'],
};

const REGULATOR_RECORD_TYPES = [
  'All',
  'CBYD Tickets',
  'Permit-Linked',
  'Conflicts',
  'SLA Exceptions',
  'Fee-Bearing Events',
];

const REGULATOR_TABS = [
  ['dashboard', 'Dashboard'],
  ['cbyd-records', 'CBYD Records'],
  ['conflicts', 'Conflict Register'],
  ['notifications', 'Notifications & SLA'],
  ['linked-permits', 'Linked Permits'],
  ['fee-events', 'Fee Events'],
  ['reports', 'Reports / Audit Log'],
];

const REGULATOR_METRICS_BY_WINDOW = {
  'Last 30 days': { submitted: 5, permits: 4, conflicts: 3, notifications: 11, slaExceptions: 1, feeEvents: 4 },
  'Last 60 days': { submitted: 14, permits: 12, conflicts: 7, notifications: 31, slaExceptions: 2, feeEvents: 11 },
  'Last 90 days': { submitted: 23, permits: 20, conflicts: 11, notifications: 52, slaExceptions: 3, feeEvents: 18 },
  'All time': { submitted: 42, permits: 36, conflicts: 18, notifications: 91, slaExceptions: 5, feeEvents: 34 },
};

const REGULATOR_SYNTHETIC_PROFILES = [
  {
    code: 'RIV',
    agency: 'Rivers Permit Office',
    market: 'Nigeria / Rivers',
    submittedBy: 'R. Okafor',
    officerId: 'RIV-INT-042',
    corridor: 'Garrison Junction to Elekahia Road',
    owners: ['Fiber Agency', 'Water Corporation', 'Power Distribution Co.', 'Drainage Dept.'],
  },
  {
    code: 'LAG',
    agency: 'Lagos Infrastructure Coordination Office',
    market: 'Nigeria / Lagos',
    submittedBy: 'A. Bello',
    officerId: 'LAG-INT-118',
    corridor: 'Ikeja CBD to Maryland Exchange',
    owners: ['Equinox Telecom', 'Water Corporation'],
  },
  {
    code: 'ABJ',
    agency: 'Abuja ROW Coordination Desk',
    market: 'Nigeria / FCT',
    submittedBy: 'M. Danladi',
    officerId: 'ABJ-INT-073',
    corridor: 'Central Business District Segment A',
    owners: ['Fiber Agency', 'Gas Utility', 'Power Distribution Co.', 'Water Board', 'Transport Authority'],
  },
  {
    code: 'NFC',
    agency: 'National Fiber Corridor Desk',
    market: 'Nigeria / Kano',
    submittedBy: 'E. Nwosu',
    officerId: 'NFC-INT-031',
    corridor: 'Kano Metro Ring Segment 2',
    owners: ['State Fiber Agency'],
  },
  {
    code: 'OGN',
    agency: 'National Fiber Corridor Desk',
    market: 'Nigeria / Ogun',
    submittedBy: 'P. Musa',
    officerId: 'NFC-INT-066',
    corridor: 'Abeokuta Industrial Access Route',
    owners: ['State Fiber Agency', 'Power Distribution Co.'],
  },
];

function regulatorMetricsForWindow(window) {
  return REGULATOR_METRICS_BY_WINDOW[window] || REGULATOR_METRICS_BY_WINDOW['Last 30 days'];
}

function regulatorRowsForWindow(window) {
  const targetCount = regulatorMetricsForWindow(window).submitted;
  return Array.from({ length: targetCount }, (_, index) => {
    if (REGULATOR_ROWS[index]) return normalizeRegulatorRow(REGULATOR_ROWS[index], index);

    const profile = REGULATOR_SYNTHETIC_PROFILES[index % REGULATOR_SYNTHETIC_PROFILES.length];
    const serial = index + 41;
    const day = String(Math.max(1, 10 - (index % 28))).padStart(2, '0');
    const hour = String(8 + (index % 9)).padStart(2, '0');
    const conflicts = index % 6 === 0 ? 0 : (index % 5) + 1;
    const sla = index % 11 === 0 ? 'Exception' : index % 4 === 0 ? 'Warning' : 'On Track';
    const status = sla === 'Exception'
      ? 'Escalated to regulator review'
      : sla === 'Warning'
        ? 'Under conflict review'
        : index % 3 === 0
          ? 'Cleared for conditional proceed'
          : 'Awaiting owner response';

    return normalizeRegulatorRow({
      permitNumber: `${profile.code}-PER-2026-${String(serial).padStart(3, '0')}`,
      ticket: `CBYD-${profile.code}-${String(serial).padStart(5, '0')}`,
      requester: ['Delta Civil Works Ltd.', 'UrbanLink Contractors', 'Metro Utility Works', 'NorthGrid Fiber Services', 'State Corridor Works'][index % 5],
      submittedBy: profile.submittedBy,
      officerId: profile.officerId,
      agency: profile.agency,
      market: profile.market,
      lga: lgaForMarket(profile.market, index),
      corridor: profile.corridor,
      conflicts,
      owners: profile.owners,
      notificationStatus: conflicts === 0 ? 'No conflicts detected' : sla === 'Exception' ? `${Math.max(conflicts - 1, 1)} acknowledged / 1 escalated` : `${Math.max(conflicts - 1, 1)} acknowledged / 1 pending`,
      sla,
      status,
      submittedDate: `2026-05-${day} ${hour}:20`,
      feeBearing: index % 5 === 0 ? 'No' : 'Yes',
    }, index);
  });
}

function stateFromMarket(market) {
  return market?.split(' / ')[1] || 'Rivers';
}

function lgaForMarket(market, index = 0) {
  const state = stateFromMarket(market);
  const lgas = (STATE_LGAS[state] || STATE_LGAS.Rivers).filter((item) => item !== 'All LGAs');
  return lgas[index % lgas.length] || 'Port Harcourt';
}

function normalizeRegulatorRow(row, index = 0) {
  const state = row.state || stateFromMarket(row.market);
  return {
    requester: row.requester || ['Delta Civil Works Ltd.', 'UrbanLink Contractors', 'Metro Utility Works', 'NorthGrid Fiber Services'][index % 4],
    corridorRecordStatus: row.corridorRecordStatus || row.status,
    assetScreeningStatus: row.assetScreeningStatus || (row.conflicts > 0 ? 'Conflicts detected' : 'No material conflict'),
    responsePackageStatus: row.responsePackageStatus || (row.sla === 'Exception' ? 'Regulator review required' : 'Response package available'),
    ...row,
    state,
    lga: row.lga || lgaForMarket(row.market, index),
  };
}

function dateWindowForRegulatorFilter(dateRange) {
  if (dateRange === 'Last 90 Days') return 'Last 90 days';
  if (dateRange === 'Custom') return 'All time';
  return 'Last 30 days';
}

function recordTypeMatches(row, recordType) {
  if (recordType === 'All' || recordType === 'CBYD Tickets') return true;
  if (recordType === 'Permit-Linked') return Boolean(row.permitNumber);
  if (recordType === 'Conflicts') return row.conflicts > 0;
  if (recordType === 'SLA Exceptions') return row.sla === 'Warning' || row.sla === 'Exception';
  if (recordType === 'Fee-Bearing Events') return row.feeBearing === 'Yes';
  return true;
}

function regulatorMetricsFromRows(rows) {
  return {
    submitted: rows.length,
    permits: rows.filter((row) => row.permitNumber).length,
    conflicts: rows.reduce((sum, row) => sum + row.conflicts, 0),
    notifications: rows.reduce((sum, row) => sum + row.owners.length, 0),
    slaExceptions: rows.filter((row) => row.sla === 'Warning' || row.sla === 'Exception').length,
    feeEvents: rows.filter((row) => row.feeBearing === 'Yes').length,
  };
}

const NEW_INTAKE_TEMPLATE = { ...INTAKES[0], id: 'INT-NEW', packetId: 'CBYD-INT-DRAFT', requester: 'New Requester', completeness: 34, status: 'Draft Intake Request', permitRef: 'TBD', contact: 'Unassigned', email: 'pending@example.demo', phone: 'Pending', attachments: 0, sketchFileName: '', sketchUnavailable: false };

export default function GovernmentIntakeDemo() {
  const [countryName, setCountryName] = useState('Nigeria');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mode, setMode] = useState('landing');
  const [step, setStep] = useState(1);
  const [selectedPacket, setSelectedPacket] = useState(INTAKES[0]);
  const [filters, setFilters] = useState({ search: '', state: 'All', category: 'All', status: 'All' });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [permitSearch, setPermitSearch] = useState('');
  const [authForm, setAuthForm] = useState(() => makeAuthForm('Rivers Permit Office'));

  const country = COUNTRIES[countryName];
  const countryRecords = INTAKES.filter((record) => record.country === countryName);
  const availableRegions = country.regions;
  const availableCategories = [...new Set(countryRecords.map((record) => record.workCategory))];
  const availableStatuses = [...new Set(countryRecords.map((record) => record.status))];

  const filteredRecords = useMemo(() => filterRecords(countryRecords, filters), [countryRecords, filters]);
  const workflowPacket = useMemo(() => withWorkflowCompleteness(selectedPacket, mode, step), [selectedPacket, mode, step]);

  const selectCountry = (name) => {
    const firstRecord = INTAKES.find((record) => record.country === name) || INTAKES[0];
    setCountryName(name);
    setSelectedPacket(firstRecord);
    setFilters({ search: '', state: 'All', category: 'All', status: 'All' });
    setMode('landing');
    setActiveTab('dashboard');
    setStep(1);
  };

  const selectRecord = (record, targetStep = 1) => {
    setSelectedPacket(record);
    setMode('intake');
    setActiveTab('intakes');
    setStep(targetStep);
  };

  const openApplication = (record) => {
    setSelectedPacket(record);
    setActiveTab('applications');
    if (record.status === 'Draft Intake Request') {
      setMode('intake');
      setStep(2);
      return;
    }
    setMode('application-detail');
    setStep(1);
  };

  const openDashboard = () => {
    setMode('landing');
    setActiveTab('dashboard');
    setStep(1);
  };

  const openRegulatorReview = () => {
    setMode('review');
    setActiveTab('dashboard');
  };

  const openRoleDashboard = () => {
    if (mode === 'review') {
      setMode('review');
      setActiveTab('dashboard');
      return;
    }
    openDashboard();
  };

  const openNewIntake = () => {
    setAuthForm(makeAuthForm('Rivers Permit Office'));
    setMode('intake-auth');
    setActiveTab('intakes');
    setStep(1);
  };

  const authenticateIntake = () => {
    const [country, state] = marketForAgency(authForm.agency).split(' / ');
    setCountryName(country);
    setSelectedPacket({
      ...NEW_INTAKE_TEMPLATE,
      country,
      state,
      agency: authForm.agency,
      officer: authForm.officer,
      officerId: authForm.officerId,
      channel: 'Assisted Intake',
      completeness: STEP_COMPLETENESS[1],
    });
    setMode('intake');
    setActiveTab('intakes');
    setStep(1);
  };

  const submitToDicri = () => {
    setSelectedPacket((packet) => ({ ...packet, status: 'Submitted to DICRI', completeness: submittedCompleteness(packet) }));
    setStep(10);
  };

  const updatePacket = (patch) => setSelectedPacket((packet) => normalizePacketPatch(packet, patch));

  const toggleClassification = (classification) => {
    const exists = selectedPacket.classifications.includes(classification);
    const next = exists
      ? selectedPacket.classifications.filter((item) => item !== classification)
      : [...selectedPacket.classifications, classification];
    updatePacket({ classifications: next, workCategory: next[0] || selectedPacket.workCategory });
  };

  const updateEligibility = (key, value) => {
    const eligibility = { ...selectedPacket.eligibility, [key]: value };
    const warning = eligibility.ground === 'No'
      ? 'Likely not CBYD unless work scope changes.'
      : eligibility.depthKnown === 'No'
        ? 'Excavation depth unknown; clarification recommended.'
        : selectedPacket.warning;
    updatePacket({
      eligibility,
      groundDisturbance: eligibility.ground,
      workAreaType: eligibility.corridor,
      warning,
      completeness: STEP_COMPLETENESS[3],
    });
  };

  const nextStep = () => {
    if (step >= 9) submitToDicri();
    else setStep((current) => Math.min(current + 1, 9));
  };

  const backStep = () => setStep((current) => Math.max(current - 1, 1));

  const renderMain = () => {
    if (mode === 'landing') {
      return <CBYDLanding onStartIntake={openNewIntake} onOpenReview={openRegulatorReview} />;
    }
    if (mode === 'intake-auth') {
      return <IntakeAuthPage authForm={authForm} setAuthForm={setAuthForm} onAuthenticate={authenticateIntake} onBack={() => setMode('landing')} />;
    }
    if (mode === 'review') {
      return <RegulatorReviewConsole activeTab={activeTab} onSwitchToIntake={openNewIntake} />;
    }
    if (mode === 'intake') {
      return (
        <IntakeWorkflow
          country={country}
          packet={workflowPacket}
          step={step}
          nextStep={nextStep}
          backStep={backStep}
          openDashboard={openDashboard}
          updatePacket={updatePacket}
          updateEligibility={updateEligibility}
          toggleClassification={toggleClassification}
          submitToDicri={submitToDicri}
          setModal={setModal}
        />
      );
    }
    if (mode === 'application-detail') {
      return <ApplicationPackageDetail packet={workflowPacket} onAmend={() => { setMode('intake'); setActiveTab('applications'); setStep(2); }} onBack={() => { setMode('dashboard'); setActiveTab('applications'); }} />;
    }
    if (activeTab === 'intakes') {
      return <IntakesPage countryName={countryName} records={filteredRecords} filters={filters} setFilters={setFilters} regions={availableRegions} categories={availableCategories} statuses={availableStatuses} onOpen={selectRecord} onNew={openNewIntake} />;
    }
    if (activeTab === 'applications') {
      return <ApplicationsPage records={countryRecords} onOpen={openApplication} />;
    }
    if (activeTab === 'permits') {
      return <PermitsPage records={countryRecords} search={permitSearch} setSearch={setPermitSearch} onOpen={selectRecord} />;
    }
    if (activeTab === 'reports') {
      return <ReportsPage records={countryRecords} countryName={countryName} />;
    }
    return <Dashboard records={countryRecords} filteredRecords={filteredRecords} countryName={countryName} onOpenQueue={() => setActiveTab('intakes')} onOpen={selectRecord} onNew={openNewIntake} />;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-[#001B3D] antialiased">
      <TopNav
        country={country}
        countryName={countryName}
        selectCountry={selectCountry}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (mode === 'review') {
            setMode('review');
            setActiveTab(tab);
            return;
          }
          setMode('dashboard');
          setActiveTab(tab);
        }}
        openDashboard={openRoleDashboard}
        notificationOpen={notificationOpen}
        setNotificationOpen={setNotificationOpen}
        isRegulatorView={mode === 'review'}
        onNotification={(notification) => {
          const record = INTAKES.find((item) => item.id === notification.intakeId);
          if (record) {
            setCountryName(record.country);
            setSelectedPacket(record);
            setMode('intake');
            setActiveTab('intakes');
            setStep(5);
          }
          setModal({ type: 'notification', notification });
          setNotificationOpen(false);
        }}
      />
      {['landing', 'intake-auth', 'review'].includes(mode) ? (
        <main className="min-h-[calc(100vh-76px)] p-6">{renderMain()}</main>
      ) : (
        <div className="grid grid-cols-[260px_1fr_340px] min-h-[calc(100vh-76px)]">
          <SideRail step={mode === 'intake' ? step : 1} onStepClick={(n) => { setMode('intake'); setActiveTab('intakes'); setStep(n); }} />
          <main className="min-w-0 p-6 pb-24">{renderMain()}</main>
          <SnapshotPanel packet={workflowPacket} mode={mode} step={step} />
        </div>
      )}
      {modal && <DetailModal modal={modal} close={() => setModal(null)} />}
    </div>
  );
}

function CBYDLanding({ onStartIntake, onOpenReview }) {
  return (
    <section className="min-h-[calc(100vh-124px)] rounded-3xl border border-white/10 bg-[#071A33] text-white shadow-2xl overflow-hidden">
      <div className="relative p-8 md:p-12">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 900 420" className="h-full w-full">
            <path d="M40 310 C180 210 310 250 440 170 S690 92 860 150" fill="none" stroke="#22C55E" strokeWidth="26" strokeLinecap="round" />
            <path d="M110 80 H810" stroke="#3B82F6" strokeWidth="8" strokeDasharray="16 14" />
            <path d="M250 50 V380" stroke="#D4A100" strokeWidth="7" strokeDasharray="12 14" />
          </svg>
        </div>
        <div className="relative max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A100]/30 bg-[#D4A100]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-amber-200">
            Nigerian Government CBYD Oversight
          </div>
          <h1 className="mt-6 text-5xl font-black tracking-tight">Call Before You Dig Governance Portal</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-blue-100/80">
            Secure intake, conflict screening, stakeholder notification, and regulator visibility for excavation activity.
          </p>
        </div>

        <div className="relative mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <RoleAccessCard
            icon={ClipboardCheck}
            title="New Intake"
            description="For authorized intake personnel creating or processing excavation and dig-notice requests."
            button="Start New Intake"
            onClick={onStartIntake}
          />
          <RoleAccessCard
            icon={Shield}
            title="Regulator Review"
            description="For authorized regulators and oversight users reviewing submitted CBYD activity, permit linkage, conflict screening, notifications, and status."
            button="Open Review Console"
            onClick={onOpenReview}
            accent="gold"
          />
        </div>
      </div>
    </section>
  );
}

function RoleAccessCard({ icon: Icon, title, description, button, onClick, accent = 'blue' }) {
  const accentClass = accent === 'gold' ? 'border-[#D4A100]/35 bg-[#D4A100]/10 text-amber-200' : 'border-blue-400/30 bg-blue-500/10 text-blue-200';
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/55 p-6 md:p-7 shadow-2xl">
      <div className={`h-14 w-14 rounded-2xl border flex items-center justify-center ${accentClass}`}>
        <Icon size={26} />
      </div>
      <h2 className="mt-6 text-2xl font-black text-white">{title}</h2>
      <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-slate-300">{description}</p>
      <button onClick={onClick} className="mt-6 rounded-xl bg-[#D4A100] px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-lg hover:bg-[#b98d00]">
        {button}
      </button>
    </article>
  );
}

function IntakeAuthPage({ authForm, setAuthForm, onAuthenticate, onBack }) {
  const officers = DEPARTMENT_OFFICERS[authForm.agency] || DEPARTMENT_OFFICERS[INTAKE_AGENCIES[0]];
  const updateAgency = (agency) => setAuthForm(makeAuthForm(agency));
  const updateOfficer = (name) => {
    const officer = officers.find((item) => item.name === name) || officers[0];
    setAuthForm((current) => ({ ...current, officer: officer.name, officerId: officer.id }));
  };
  return (
    <section className="min-h-[calc(100vh-124px)] grid place-items-center rounded-3xl border border-white/10 bg-[#071A33] p-6 text-white shadow-2xl">
      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-950/65 p-7 md:p-9 shadow-2xl">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-blue-300">Secure Government Access</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">Authorized Intake Access</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">Authenticate as an approved intake officer before creating or processing a CBYD request.</p>
          </div>
          <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4A100]/30 bg-[#D4A100]/10 text-amber-200"><Shield size={30} /></div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <DarkSelect label="Department / Agency" value={authForm.agency} options={INTAKE_AGENCIES} onChange={updateAgency} />
          <DarkSelect label="Intake Officer" value={authForm.officer} options={officers.map((officer) => officer.name)} onChange={updateOfficer} />
          <DarkField label="Officer ID" value={authForm.officerId} readOnly />
          <DarkField label="Password" value={authForm.password} type="password" onChange={(password) => setAuthForm((current) => ({ ...current, password }))} placeholder="Type anything for demo" />
          <DarkField label="MFA Code" value={authForm.mfa} onChange={(mfa) => setAuthForm((current) => ({ ...current, mfa }))} placeholder="Any demo code" />
          <DarkField label="Default Market / Region" value={marketForAgency(authForm.agency)} readOnly />
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <button onClick={onBack} className="rounded-xl border border-white/15 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-200 hover:bg-white/10">Back</button>
          <button onClick={onAuthenticate} className="rounded-xl bg-[#D4A100] px-7 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg hover:bg-[#b98d00]">Authenticate</button>
        </div>
      </div>
    </section>
  );
}

function DarkSelect({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-[48px] w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-bold text-white outline-none focus:border-blue-400">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function DarkField({ label, value, onChange, readOnly, type = 'text', placeholder }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      <input value={value || ''} readOnly={readOnly} type={type} placeholder={placeholder} onChange={(event) => onChange?.(event.target.value)} className="mt-2 min-h-[48px] w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-bold text-white outline-none focus:border-blue-400" />
    </label>
  );
}

function TopNav({ country, countryName, selectCountry, activeTab, setActiveTab, openDashboard, notificationOpen, setNotificationOpen, onNotification, isRegulatorView }) {
  const tabs = isRegulatorView
    ? REGULATOR_TABS
    : [['dashboard', 'Dashboard'], ['intakes', 'Intakes'], ['applications', 'Applications'], ['permits', 'Permits'], ['reports', 'Reports']];
  return (
    <header className="h-[76px] bg-[#062247] text-white border-b border-[#D4A100]/40 shadow-lg sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-5">
        <div className="flex items-center gap-5 min-w-[430px]">
          <GovernmentMark country={country} />
          <div className="h-10 w-px bg-white/15" />
          <button onClick={openDashboard} className="flex items-center gap-4 text-left">
            <DicriLogo />
            <div className="leading-none">
              <div className="text-3xl font-black tracking-tight">DICRI</div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-blue-100/80 mt-1">Digital Infrastructure Corridor<br />Rights & Intake</div>
            </div>
          </button>
        </div>
        <nav className="flex h-full items-center gap-3">
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`relative h-full px-2 text-xs font-black transition-colors ${activeTab === id ? 'text-white' : 'text-blue-100/70 hover:text-white'}`}>
              {label}
              {activeTab === id && <span className="absolute left-0 right-0 bottom-0 h-1 bg-[#D4A100] rounded-t-full shadow-[0_-6px_18px_rgba(212,161,0,0.45)]" />}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4 min-w-[380px] justify-end relative">
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-widest">
            <Globe2 size={14} />
            <select value={countryName} onChange={(event) => selectCountry(event.target.value)} className="bg-transparent text-white outline-none">
              {Object.keys(COUNTRIES).map((name) => <option key={name} className="text-slate-900">{name}</option>)}
            </select>
          </label>
          <button onClick={() => setNotificationOpen(!notificationOpen)} className="relative p-2 text-blue-100 hover:text-white">
            <Bell size={21} />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#D4A100] text-[11px] font-black text-white flex items-center justify-center">3</span>
          </button>
          {notificationOpen && (
            <div className="absolute right-12 top-14 w-96 rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-2xl z-50">
              <h3 className="px-3 py-2 text-sm font-black">Notifications</h3>
              {NOTIFICATIONS.map((notification) => (
                <button key={notification.id} onClick={() => onNotification(notification)} className="w-full rounded-xl p-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black">{notification.title}</p>
                    <StatusBadge status={notification.severity} />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{notification.body}</p>
                  <p className="text-[10px] font-black text-blue-700 mt-2 uppercase tracking-widest">{notification.intakeId}</p>
                </button>
              ))}
            </div>
          )}
          <div className="h-10 w-10 rounded-full bg-white text-[#062247] flex items-center justify-center font-black shadow-lg">RO</div>
        </div>
      </div>
    </header>
  );
}

function GovernmentMark({ country }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-inner"><span className="text-xl">{country.emblem}</span></div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-12 overflow-hidden rounded-sm border border-white/30 shadow-sm flex">{country.flag.map((color, idx) => <div key={idx} className="flex-1" style={{ backgroundColor: color }} />)}</div>
        <div className="leading-none hidden xl:block">
          <div className="text-[10px] font-black uppercase tracking-tight text-white">{country.agency}</div>
          <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-blue-100/65 mt-1">{country.subAgency}</div>
        </div>
      </div>
    </div>
  );
}

function DicriLogo() {
  return (
    <svg viewBox="0 0 100 100" className="h-10 w-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.35)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5L15 20V45C15 70 50 92 50 92C50 92 88 70 88 45V20L50 5Z" fill="#0F172A" stroke="#3B82F6" strokeWidth="3" />
      <path d="M35 35C48 35 48 65 58 65" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 45C45 45 45 55 58 55" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 55C45 55 45 45 58 45" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="75" r="14" fill="#3B82F6" />
      <path d="M74 75L78 79L86 71" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SideRail({ step, onStepClick }) {
  return (
    <aside className="bg-white border-r border-slate-200 p-4 pt-6">
      <h3 className="text-sm font-black text-[#001B3D] mb-7">CBYD Excavation Intake</h3>
      <div className="space-y-1">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const complete = n < step || step === 10;
          const active = n === step;
          return (
            <button key={label} onClick={() => onStepClick(Math.min(n, 9))} className="w-full flex items-center gap-4 py-2 text-left group">
              <div className="flex flex-col items-center">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 text-sm font-black transition-all ${complete ? 'bg-[#0B7F3A] border-[#0B7F3A] text-white' : active ? 'bg-white border-[#D4A100] text-[#062247] shadow-md' : 'bg-[#062247] border-[#062247] text-white'}`}>{n === 10 ? <Check size={18} /> : complete && n < 10 ? <Check size={18} /> : n}</div>
                {n < STEPS.length && <div className="h-7 w-px bg-slate-300" />}
              </div>
              <div className="text-sm font-black text-[#001B3D] leading-tight">{label}</div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function SnapshotPanel({ packet, mode, step }) {
  const status = step === 10 ? 'Submitted to DICRI' : packet.status;
  const ownerRisk = packet.likelyOwners.some((owner) => owner.risk === 'High') ? 'High' : packet.likelyOwners.some((owner) => owner.risk === 'Medium') ? 'Medium' : 'Low';
  return (
    <aside className="bg-white border-l border-slate-200 p-6">
      <h3 className="flex items-center gap-2 text-lg font-black mb-6"><FileText size={19} /> Intake Snapshot</h3>
      <div className="space-y-5">
        <SnapshotItem label="Selected Intake" value={packet.id} />
        <SnapshotItem label="Intake Agency / Office" value={packet.agency} />
        <SnapshotItem label="Intake Officer" value={`${packet.officer} / ${packet.officerId}`} />
        <SnapshotItem label="Market / Region" value={`${packet.country} / ${packet.state}`} />
        <SnapshotItem label="Status" value={status} badge tone={status === 'Submitted to DICRI' || status === 'Ready for Review' ? 'green' : status === 'Needs Clarification' ? 'red' : 'amber'} />
        <SnapshotItem label="Ground Disturbance" value={packet.groundDisturbance} badge tone={packet.groundDisturbance === 'Yes' ? 'green' : 'amber'} />
        <SnapshotItem label="Work Area Type" value={packet.workAreaType} />
        <SnapshotItem label="Permit Ref" value={packet.permitRef} />
        <SnapshotItem label="Declared Corridor" value={packet.location} />
        <SnapshotItem label="Sketch / Markup" value={sketchStatus(packet)} badge tone={packet.sketchFileName ? 'green' : packet.sketchUnavailable ? 'amber' : 'red'} />
        <div className="border-t border-slate-200 pt-5">
          <div className="flex justify-between text-xs font-black uppercase text-slate-500 mb-2"><span>Intake Completeness</span><span className="text-[#001B3D]">{packet.completeness}%</span></div>
          <Progress value={packet.completeness} wide />
        </div>
        <SnapshotItem label="Warning" value={packet.warning} badge tone="amber" />
        <SnapshotItem label="Likely Owner Risk" value={ownerRisk} badge tone={ownerRisk === 'High' ? 'red' : ownerRisk === 'Medium' ? 'amber' : 'green'} />
      </div>
    </aside>
  );
}

function Dashboard({ records, filteredRecords, countryName, onOpenQueue, onOpen, onNew }) {
  const ready = records.filter((record) => record.status === 'Ready for Review').length;
  const clarify = records.filter((record) => record.status === 'Needs Clarification').length;
  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Authorized Intake Dashboard</h1>
          <p className="text-slate-600 mt-2 text-lg">{countryName} excavation requests awaiting pre-screening</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onOpenQueue} className="rounded-xl border border-[#001B3D] bg-white px-7 py-3 font-black hover:bg-slate-50">Open Queue</button>
          <button onClick={onNew} className="rounded-xl bg-[#D4A100] px-7 py-3 font-black text-white shadow-lg hover:bg-[#b98d00]">+ New Assisted Intake</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Market Intakes" value={records.length} sub={countryName} tone="blue" />
        <KpiCard label="Needs Clarification" value={clarify} sub="Action" tone="amber" />
        <KpiCard label="Ready for DICRI" value={ready} sub="Ready" tone="green" />
        <KpiCard label="Visible After Filters" value={filteredRecords.length} sub="Queue" tone="blue" />
      </div>
      <QueueTable rows={records.slice(0, 4)} onOpen={onOpen} />
      <Card title="Corridor Intake Mix" icon={Route}>
        <div className="grid grid-cols-3 gap-4">
          <MixCard icon={Route} label="Linear Corridors" value={`${Math.round((records.filter((r) => r.workAreaType === 'Linear Corridor').length / Math.max(records.length, 1)) * 100)}%`} />
          <MixCard icon={MapPin} label="Point Excavation" value={`${records.filter((r) => r.workAreaType === 'Point Excavation').length}`} />
          <MixCard icon={Layers} label="Area / Polygon Work" value={`${records.filter((r) => r.workAreaType === 'Area / Polygon Work').length}`} />
        </div>
      </Card>
    </section>
  );
}

function RegulatorReviewConsole({ activeTab, onSwitchToIntake }) {
  const tabRecordTypes = {
    dashboard: 'All',
    'cbyd-records': 'CBYD Tickets',
    conflicts: 'Conflicts',
    notifications: 'SLA Exceptions',
    'linked-permits': 'Permit-Linked',
    'fee-events': 'Fee-Bearing Events',
    reports: 'All',
  };
  const [reviewFilters, setReviewFilters] = useState({
    permit: '',
    ticket: '',
    country: 'Nigeria',
    state: 'All States',
    lga: 'All LGAs',
    status: 'All',
    dateRange: 'Last 30 Days',
    recordType: 'All',
  });
  const [selectedTicket, setSelectedTicket] = useState(REGULATOR_ROWS[0]);
  const [roleSwitchOpen, setRoleSwitchOpen] = useState(false);
  const tabRecordType = tabRecordTypes[activeTab] || 'All';
  const effectiveRecordType = reviewFilters.recordType === 'All' ? tabRecordType : reviewFilters.recordType;
  const windowRows = regulatorRowsForWindow(dateWindowForRegulatorFilter(reviewFilters.dateRange));
  const geographyRows = windowRows.filter((row) => {
    const stateOk = reviewFilters.state === 'All States' || row.state === reviewFilters.state;
    const lgaOk = reviewFilters.lga === 'All LGAs' || row.lga === reviewFilters.lga;
    return stateOk && lgaOk;
  });
  const filtered = geographyRows.filter((row) => {
    const permitOk = !reviewFilters.permit || row.permitNumber.toLowerCase().includes(reviewFilters.permit.toLowerCase());
    const ticketOk = !reviewFilters.ticket || row.ticket.toLowerCase().includes(reviewFilters.ticket.toLowerCase());
    const statusOk = reviewFilters.status === 'All' || row.status === reviewFilters.status;
    const typeOk = recordTypeMatches(row, effectiveRecordType);
    return permitOk && ticketOk && statusOk && typeOk;
  });
  const activeTicket = selectedTicket === null ? null : filtered.find((row) => row.ticket === selectedTicket?.ticket) || filtered[0] || null;
  const windowMetrics = regulatorMetricsFromRows(geographyRows);
  const metrics = [
    ['Submitted CBYD Tickets', windowMetrics.submitted, ClipboardCheck, 'blue', 'CBYD Tickets'],
    ['Permits Linked', windowMetrics.permits, FileText, 'green', 'Permit-Linked'],
    ['Conflicts Detected', windowMetrics.conflicts, AlertTriangle, 'amber', 'Conflicts'],
    ['Notifications Issued', windowMetrics.notifications, Bell, 'blue', 'All'],
    ['SLA Exceptions', windowMetrics.slaExceptions, Clock, 'red', 'SLA Exceptions'],
    ['Fee-Bearing Events', windowMetrics.feeEvents, Database, 'green', 'Fee-Bearing Events'],
  ];
  const titleByTab = {
    dashboard: 'National Regulator Dashboard',
    'cbyd-records': 'CBYD Records',
    conflicts: 'Conflict Register',
    notifications: 'Notifications & SLA',
    'linked-permits': 'Linked Permits',
    'fee-events': 'Fee-Bearing Events',
    reports: 'Reports / Audit Log',
  };
  const updateState = (state) => setReviewFilters((current) => ({ ...current, state, lga: 'All LGAs' }));
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-[#071A33] p-7 text-white shadow-2xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-blue-300">Authorized Oversight</p>
              <span className="rounded-full border border-[#D4A100]/30 bg-[#D4A100]/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-200">Regulator View</span>
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tight">{titleByTab[activeTab] || 'National Regulator Dashboard'}</h1>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-blue-100/80">National oversight of permit-linked CBYD activity, conflict screening, stakeholder notifications, SLA status, fee-bearing events, and audit history.</p>
            <p className="mt-4 inline-flex rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-100">
              Jurisdiction: {reviewFilters.country} / {reviewFilters.state} / {reviewFilters.lga} · {reviewFilters.dateRange}
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <button className="rounded-xl border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-widest text-blue-100 hover:bg-white/10">Export Report</button>
            <button onClick={() => setReviewFilters((current) => ({ ...current, recordType: 'SLA Exceptions' }))} className="rounded-xl border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-widest text-blue-100 hover:bg-white/10">View SLA Exceptions</button>
            <button onClick={() => setReviewFilters((current) => ({ ...current, recordType: 'Conflicts' }))} className="rounded-xl border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-widest text-blue-100 hover:bg-white/10">Open Conflict Register</button>
            <button onClick={() => setReviewFilters((current) => ({ ...current, recordType: 'All' }))} className="rounded-xl border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-widest text-blue-100 hover:bg-white/10">View Audit Trail</button>
            <button onClick={() => setRoleSwitchOpen(true)} className="rounded-xl bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white/15">Switch to Intake Operations</button>
          </div>
        </div>
      </div>

      {roleSwitchOpen && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-amber-950">You are leaving Regulator View.</h2>
              <p className="mt-1 text-sm text-amber-900">Intake creation requires Intake Operations permissions. Continue only if you intend to authenticate as an intake clerk or operations user.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setRoleSwitchOpen(false)} className="rounded-xl border border-amber-700 px-5 py-3 text-xs font-black uppercase tracking-widest text-amber-900">Stay in Regulator View</button>
              <button onClick={onSwitchToIntake} className="rounded-xl bg-[#D4A100] px-5 py-3 text-xs font-black uppercase tracking-widest text-white">Continue to Intake Login</button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 shadow-sm">
        Metrics and records reflect selected jurisdiction, date range, and record type. This is an oversight console; CBYD intake creation is handled separately in Intake Operations.
      </div>

      <Card title="Jurisdiction Filters" icon={Filter}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
          <ControlledSelect label="Country / Market" value={reviewFilters.country} options={['Nigeria']} onChange={(country) => setReviewFilters((current) => ({ ...current, country }))} />
          <ControlledSelect label="State" value={reviewFilters.state} options={Object.keys(STATE_LGAS)} onChange={updateState} />
          <ControlledSelect label="LGA" value={reviewFilters.lga} options={STATE_LGAS[reviewFilters.state] || STATE_LGAS['All States']} onChange={(lga) => setReviewFilters((current) => ({ ...current, lga }))} />
          <ControlledSelect label="Date Range" value={reviewFilters.dateRange} options={REGULATOR_DATE_OPTIONS} onChange={(dateRange) => setReviewFilters((current) => ({ ...current, dateRange }))} />
          <ControlledSelect label="Record Type" value={reviewFilters.recordType} options={REGULATOR_RECORD_TYPES} onChange={(recordType) => setReviewFilters((current) => ({ ...current, recordType }))} />
          <div className="flex items-end"><button onClick={() => setReviewFilters({ permit: '', ticket: '', country: 'Nigeria', state: 'All States', lga: 'All LGAs', status: 'All', dateRange: 'Last 30 Days', recordType: 'All' })} className="min-h-[46px] w-full rounded-lg border border-[#001B3D] px-4 py-3 font-black hover:bg-slate-50">Reset</button></div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-6 gap-4">
        {metrics.map(([label, value, Icon, tone, recordType]) => (
          <button key={label} onClick={() => setReviewFilters((current) => ({ ...current, recordType }))} className="text-left">
            <KpiCard label={label} value={value} sub={reviewFilters.dateRange} tone={tone} icon={Icon} />
          </button>
        ))}
      </div>

      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <Card title="Regional Activity Summary" icon={Map}>
            {Object.entries(geographyRows.reduce((summary, row) => ({ ...summary, [row.state]: (summary[row.state] || 0) + 1 }), {})).map(([state, count]) => <ReportBar key={state} label={state} value={Math.max(8, Math.round((count / Math.max(geographyRows.length, 1)) * 100))} tone="blue" />)}
          </Card>
          <Card title="SLA Exception Summary" icon={Clock}>
            <Metric label="Warning / Exception Records" value={windowMetrics.slaExceptions} tone={windowMetrics.slaExceptions ? 'red' : 'green'} />
            <Metric label="Oversight Scope" value={`${reviewFilters.state} / ${reviewFilters.lga}`} />
          </Card>
          <Card title="Audit Log Scope" icon={History}>
            <Metric label="Read-Only Records" value={filtered.length} />
            <Metric label="Record Type" value={effectiveRecordType} />
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_420px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <Card title="Regulatory Visibility" icon={Shield}>
            <p className="text-sm leading-relaxed text-slate-700">
              This view gives authorized oversight users visibility into permit-linked CBYD activity, intake volumes, conflict screening, stakeholder notifications, SLA status, and audit history. It supports transparent governance of excavation activity and PPP-linked reporting.
            </p>
          </Card>
          <Card title={`${effectiveRecordType === 'All' ? 'CBYD Oversight Records' : effectiveRecordType} Record Filters`} icon={Search}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <EditableField label="Permit Number" value={reviewFilters.permit} onChange={(permit) => setReviewFilters((current) => ({ ...current, permit }))} />
              <EditableField label="CBYD Ticket" value={reviewFilters.ticket} onChange={(ticket) => setReviewFilters((current) => ({ ...current, ticket }))} />
              <ControlledSelect label="Status" value={reviewFilters.status} options={['All', ...new Set(windowRows.map((row) => row.status))]} onChange={(status) => setReviewFilters((current) => ({ ...current, status }))} />
              <div className="flex items-end"><button onClick={() => setReviewFilters((current) => ({ ...current, permit: '', ticket: '', status: 'All' }))} className="min-h-[46px] w-full rounded-lg border border-[#001B3D] px-4 py-3 font-black hover:bg-slate-50">Clear Record Filters</button></div>
            </div>
          </Card>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <table className="w-full min-w-[1280px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  {['Permit Number', 'CBYD Ticket', 'Submitted By', 'Department / Agency', 'State / LGA', 'Corridor / Location', 'Conflicts Detected', 'Asset Owners Notified', 'Notification Status', 'SLA Status', 'Current Status', 'Submitted Date'].map((header) => <th key={header} className="px-4 py-3">{header}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((row) => (
                  <tr key={row.ticket} onClick={() => setSelectedTicket(row)} className={`cursor-pointer hover:bg-slate-50 ${activeTicket?.ticket === row.ticket ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-4 font-mono text-sm font-bold">{row.permitNumber}</td>
                    <td className="px-4 py-4 font-black">{row.ticket}</td>
                    <td className="px-4 py-4">{row.submittedBy}</td>
                    <td className="px-4 py-4">{row.agency}</td>
                    <td className="px-4 py-4">{row.state} / {row.lga}</td>
                    <td className="px-4 py-4">{row.corridor}</td>
                    <td className="px-4 py-4">{row.conflicts}</td>
                    <td className="px-4 py-4 text-sm">{row.owners.join(', ')}</td>
                    <td className="px-4 py-4">{row.notificationStatus}</td>
                    <td className="px-4 py-4"><StatusBadge status={row.sla} /></td>
                    <td className="px-4 py-4">{row.status}</td>
                    <td className="px-4 py-4">{row.submittedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="p-8 text-center text-slate-500">No regulator records match the current jurisdiction and record filters.</div>}
          </div>
        </div>
        <RegulatorDetailPanel row={activeTicket} onClose={() => setSelectedTicket(null)} />
      </div>
    </section>
  );
}

function RegulatorDetailPanel({ row, onClose }) {
  if (!row) {
    return (
      <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sticky top-24">
        <h2 className="text-xl font-black mb-2">Review Detail</h2>
        <p className="text-sm text-slate-600">Select a CBYD ticket row to inspect permit linkage, notifications, SLA status, and audit history.</p>
      </aside>
    );
  }
  const audit = [
    `Intake created by ${row.submittedBy} - ${row.submittedDate}`,
    'Corridor screened - 2026-05-10 10:44',
    `${row.conflicts} likely asset owners identified - 2026-05-10 10:45`,
    'Notifications issued - 2026-05-10 10:46',
    `${row.owners[1] || row.owners[0]} acknowledged - 2026-05-10 11:12`,
    row.sla === 'Warning' || row.sla === 'Exception' ? 'Pending owner response - SLA warning active' : 'Stakeholder response remains on track',
    'Packet submitted to DICRI Operations - 2026-05-10 11:30',
  ];
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sticky top-24">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="text-xl font-black">Review Detail</h2>
        <button onClick={onClose} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black hover:bg-slate-50">Close</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SnapshotItem label="CBYD Ticket ID" value={row.ticket} />
        <SnapshotItem label="Permit Reference" value={row.permitNumber} />
        <SnapshotItem label="Requester" value={row.requester} />
        <SnapshotItem label="Declared Corridor" value={row.corridor} />
        <SnapshotItem label="State / LGA" value={`${row.state} / ${row.lga}`} />
        <SnapshotItem label="Corridor Record Status" value={row.corridorRecordStatus} />
        <SnapshotItem label="Asset Screening Status" value={row.assetScreeningStatus} />
        <SnapshotItem label="Response Package Status" value={row.responsePackageStatus} />
        <SnapshotItem label="Submitted By" value={row.submittedBy} />
        <SnapshotItem label="Officer ID" value={row.officerId} />
        <SnapshotItem label="Department / Agency" value={row.agency} />
        <SnapshotItem label="Submission Timestamp" value={row.submittedDate} />
        <SnapshotItem label="SLA Status" value={row.sla} badge tone={row.sla === 'Exception' ? 'red' : row.sla === 'Warning' ? 'amber' : 'green'} />
        <SnapshotItem label="Fee-Bearing Event" value={row.feeBearing} badge tone="green" />
      </div>
      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="font-black mb-2">Conflict Screening Summary</h3>
        <p className="text-sm text-slate-700">{row.conflicts} conflicts detected. Likely asset owners: {row.owners.join(', ')}.</p>
      </div>
      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="font-black mb-2">Notifications Issued</h3>
        <p className="text-sm text-slate-700">{row.notificationStatus}. Stakeholder notification remains read-only in Regulator View.</p>
      </div>
      <div className="mt-5">
        <h3 className="font-black mb-3">Audit Trail Events</h3>
        <div className="space-y-2">
          {audit.map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">{item}</div>)}
        </div>
      </div>
    </aside>
  );
}

function RegulatorApplicationsPage() {
  const applications = [
    { id: 'APP-RIV-2026-014', requester: 'Delta Civil Works Ltd.', workType: 'Drainage Construction', market: 'Nigeria / Rivers', permit: 'PHT-DR-2218', submitted: '2026-05-10', status: 'In Review', reviewer: 'R. Okafor', stage: 'Conflict Screening' },
    { id: 'APP-LAG-2026-118', requester: 'UrbanLink Contractors', workType: 'Road Rehabilitation', market: 'Nigeria / Lagos', permit: 'LAG-RD-4491', submitted: '2026-05-09', status: 'Conditional Proceed', reviewer: 'A. Bello', stage: 'Owner Response Complete' },
    { id: 'APP-ABJ-2026-073', requester: 'Metro Utility Works', workType: 'Utility Crossing', market: 'Nigeria / FCT', permit: 'ABJ-ROW-8830', submitted: '2026-05-08', status: 'Escalated', reviewer: 'M. Danladi', stage: 'Regulator Review' },
    { id: 'APP-NFC-2026-031', requester: 'NorthGrid Fiber Services', workType: 'Fiber Deployment', market: 'Nigeria / Kano', permit: 'NFC-KAN-2210', submitted: '2026-05-07', status: 'Owner Response Pending', reviewer: 'E. Nwosu', stage: 'Stakeholder Notification' },
  ];
  return (
    <section className="space-y-6">
      <PageIntro eyebrow="Regulator View" title="CBYD Applications" text="Permit-linked excavation applications under conflict screening, stakeholder notification, and regulator review." />
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[980px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
            <tr>
              {['Application ID', 'Requester', 'Work Type', 'Market / Region', 'Linked Permit', 'Submitted Date', 'Review Status', 'Assigned Reviewer', 'Current Stage'].map((header) => <th key={header} className="px-5 py-4">{header}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {applications.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className="px-5 py-5 font-black">{row.id}</td>
                <td className="px-5 py-5">{row.requester}</td>
                <td className="px-5 py-5">{row.workType}</td>
                <td className="px-5 py-5">{row.market}</td>
                <td className="px-5 py-5 font-mono text-sm">{row.permit}</td>
                <td className="px-5 py-5">{row.submitted}</td>
                <td className="px-5 py-5"><StatusBadge status={row.status} /></td>
                <td className="px-5 py-5">{row.reviewer}</td>
                <td className="px-5 py-5">{row.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RegulatorPermitsPage() {
  const rows = regulatorRowsForWindow('Last 30 days');
  return (
    <section className="space-y-6">
      <PageIntro eyebrow="Regulator View" title="Permit Registry" text="Permit-linked CBYD activity with fee-bearing event status, SLA state, and stakeholder notification context." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard label="Visible Permits" value={rows.length} sub="Last 30 days" tone="blue" icon={FileText} />
        <KpiCard label="Warning / Exception" value={rows.filter((row) => row.sla !== 'On Track').length} sub="SLA status" tone="amber" icon={AlertTriangle} />
        <KpiCard label="Fee-Bearing Events" value={rows.filter((row) => row.feeBearing === 'Yes').length} sub="Tracked" tone="green" icon={Database} />
        <KpiCard label="Notifications Linked" value={rows.reduce((sum, row) => sum + row.owners.length, 0)} sub="Stakeholders" tone="blue" icon={Bell} />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
            <tr>
              {['Permit Number', 'CBYD Ticket', 'Issuing Authority', 'Market / Region', 'Corridor / Location', 'Permit Status', 'Fee-Bearing Event', 'SLA Status', 'Last Updated'].map((header) => <th key={header} className="px-5 py-4">{header}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row) => (
              <tr key={row.ticket} className="hover:bg-slate-50">
                <td className="px-5 py-5 font-mono text-sm font-bold">{row.permitNumber}</td>
                <td className="px-5 py-5 font-black">{row.ticket}</td>
                <td className="px-5 py-5">{row.agency}</td>
                <td className="px-5 py-5">{row.market}</td>
                <td className="px-5 py-5">{row.corridor}</td>
                <td className="px-5 py-5">{row.status}</td>
                <td className="px-5 py-5"><StatusBadge status={row.feeBearing} /></td>
                <td className="px-5 py-5"><StatusBadge status={row.sla} /></td>
                <td className="px-5 py-5">{row.submittedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RegulatorReportsPage() {
  const [reportingWindow, setReportingWindow] = useState('Last 30 days');
  const metrics = regulatorMetricsForWindow(reportingWindow);
  const rows = regulatorRowsForWindow(reportingWindow);
  const regionCounts = rows.reduce((summary, row) => ({ ...summary, [row.market]: (summary[row.market] || 0) + 1 }), {});
  const slaExceptions = rows.filter((row) => row.sla !== 'On Track');
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageIntro eyebrow="Regulator View" title="Regulator Reports" text="Oversight reporting for permit-linked CBYD activity, conflict screening, SLA exceptions, stakeholder notification, and PPP-linked reporting." />
        <div className="flex flex-wrap gap-3">
          <button className="rounded-xl border border-[#001B3D] bg-white px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-slate-50">Export Report</button>
          <button className="rounded-xl border border-[#001B3D] bg-white px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-slate-50">Download CSV</button>
          <button className="rounded-xl bg-[#D4A100] px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-[#b98d00]">Generate NCC Summary</button>
        </div>
      </div>
      <Card title="Reporting Window" icon={Calendar}>
        <div className="max-w-xs">
          <ControlledSelect label="Date Range" value={reportingWindow} options={REGULATOR_WINDOW_OPTIONS} onChange={setReportingWindow} />
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-6 gap-4">
        <KpiCard label="CBYD Tickets Submitted" value={metrics.submitted} sub={reportingWindow} tone="blue" icon={ClipboardCheck} />
        <KpiCard label="Permits Linked" value={metrics.permits} sub={reportingWindow} tone="green" icon={FileText} />
        <KpiCard label="Conflicts Detected" value={metrics.conflicts} sub={reportingWindow} tone="amber" icon={AlertTriangle} />
        <KpiCard label="SLA Exceptions" value={metrics.slaExceptions} sub={reportingWindow} tone="red" icon={Clock} />
        <KpiCard label="Fee-Bearing Events" value={metrics.feeEvents} sub={reportingWindow} tone="green" icon={Database} />
        <KpiCard label="Stakeholder Notifications" value={metrics.notifications} sub={reportingWindow} tone="blue" icon={Bell} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card title="Regional Activity Summary" icon={Map}>
          {Object.entries(regionCounts).map(([region, count]) => <ReportBar key={region} label={region} value={Math.max(8, Math.round((count / rows.length) * 100))} tone="blue" />)}
        </Card>
        <Card title="SLA Exception Summary" icon={Clock}>
          <Metric label="Items requiring oversight attention" value={slaExceptions.length} />
          <Metric label="Primary exception pattern" value={slaExceptions[0]?.status || 'No active exception'} />
        </Card>
        <Card title="Conflict Screening Trends" icon={Route}>
          <ReportBar label="Low conflict corridors" value={38} tone="green" />
          <ReportBar label="Multi-owner conflict corridors" value={47} tone="amber" />
          <ReportBar label="Escalated corridors" value={15} tone="red" />
        </Card>
        <Card title="Stakeholder Notification Status" icon={Bell}>
          <ReportBar label="Acknowledged" value={72} tone="green" />
          <ReportBar label="Pending" value={20} tone="amber" />
          <ReportBar label="Escalated" value={8} tone="red" />
        </Card>
        <Card title="Fee-Bearing Event Summary" icon={Database} className="xl:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Metric label="Tracked fee-bearing events" value={metrics.feeEvents} />
            <Metric label="Linked to permit records" value={metrics.permits} />
            <Metric label="Reporting status" value="Ready for oversight summary" />
          </div>
        </Card>
      </div>
    </section>
  );
}

function PageIntro({ eyebrow, title, text }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-700">{eyebrow}</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">{title}</h1>
      <p className="mt-2 max-w-4xl text-lg text-slate-600">{text}</p>
    </div>
  );
}

function IntakesPage({ countryName, records, filters, setFilters, regions, categories, statuses, onOpen, onNew }) {
  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Intake Queue</h1>
          <p className="text-slate-600 mt-2 text-lg">Filtered queue for {countryName}. Open any record to populate the workflow.</p>
        </div>
        <button onClick={onNew} className="rounded-xl bg-[#D4A100] px-7 py-3 font-black text-white shadow-lg hover:bg-[#b98d00]">+ New Assisted Intake</button>
      </div>
      <QueueFilters filters={filters} setFilters={setFilters} regions={regions} categories={categories} statuses={statuses} />
      <QueueTable rows={records} onOpen={onOpen} large />
    </section>
  );
}

function QueueFilters({ filters, setFilters, regions, categories, statuses }) {
  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={filters.search} onChange={(event) => update('search', event.target.value)} className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-100" placeholder="Search ID, requester, location, permit, contact..." />
      </div>
      <Select value={filters.state} onChange={(value) => update('state', value)} options={['All', ...regions]} />
      <Select value={filters.category} onChange={(value) => update('category', value)} options={['All', ...categories]} />
      <Select value={filters.status} onChange={(value) => update('status', value)} options={['All', ...statuses]} />
    </div>
  );
}

function QueueTable({ rows, onOpen, large }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
          <tr>
            <th className="px-5 py-4">Intake ID</th>
            <th className="px-5 py-4">Requester</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Location</th>
            <th className="px-5 py-4">Permit</th>
            <th className="px-5 py-4">Completeness</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              <td className="px-5 py-5 font-bold">{row.id}</td>
              <td className="px-5 py-5"><div>{row.requester}</div><div className="text-xs text-slate-500">{row.contact}</div></td>
              <td className="px-5 py-5">{row.workCategory}</td>
              <td className="px-5 py-5">{row.state}, {row.country}<div className="text-xs text-slate-500">{row.location}</div></td>
              <td className="px-5 py-5 font-mono text-sm">{row.permitRef}</td>
              <td className="px-5 py-5"><Progress value={row.completeness} /></td>
              <td className="px-5 py-5"><StatusBadge status={row.status} /></td>
              <td className="px-5 py-5 text-right"><button onClick={() => onOpen(row, large ? 1 : 9)} className="rounded-lg border border-[#001B3D] px-4 py-2 font-black hover:bg-[#001B3D] hover:text-white">Open</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="p-8 text-center text-slate-500">No intake records match the current filters.</div>}
      {!large && rows[0] && <div className="p-5 flex justify-end"><button onClick={() => onOpen(rows[0], 9)} className="rounded-xl bg-[#D4A100] px-7 py-3 text-sm font-black text-white">Open Top Packet</button></div>}
    </div>
  );
}

function ApplicationsPage({ records, onOpen }) {
  return (
    <section className="space-y-6">
      <div><h1 className="text-4xl font-black tracking-tight">Applications</h1><p className="text-slate-600 mt-2 text-lg">Permit-linked applications converted into controlled DICRI intake packages.</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200"><h2 className="text-xl font-black">Application Workbench</h2></div>
        <div className="divide-y divide-slate-200">
          {records.map((record) => (
            <button key={record.id} onClick={() => onOpen(record)} className="w-full p-5 grid grid-cols-7 gap-4 items-center text-left hover:bg-slate-50">
              <div className="font-black">{record.packetId}</div>
              <div className="font-mono text-sm">{record.permitRef}</div>
              <div className="col-span-2"><div className="font-bold">{record.requester}</div><div className="text-sm text-slate-500">{record.location}</div></div>
              <div>{record.workCategory}</div>
              <StatusBadge status={record.status} />
              <div className="text-right"><span className="inline-flex rounded-lg border border-[#001B3D] px-4 py-2 font-black hover:bg-[#001B3D] hover:text-white">{applicationActionLabel(record.status)}</span></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationPackageDetail({ packet, onAmend, onBack }) {
  const owners = packet.likelyOwners || [];
  const completeItems = [
    'Requester identity captured',
    'Declared corridor recorded',
    'Schedule provided',
    packet.sketchFileName ? 'Sketch / corridor markup received' : null,
  ].filter(Boolean);
  const optionalGaps = [
    !packet.sketchFileName ? 'Optional sketch not provided; wider screening buffer may be applied.' : null,
    packet.sideOfRoad === 'Unknown' ? 'Side of road unknown; side-specific screening unavailable.' : null,
  ].filter(Boolean);
  const screeningStatus = packet.status === 'Submitted to DICRI'
    ? 'Asset screening pending'
    : packet.status === 'Ready for Review'
      ? 'Corridor record created'
      : packet.status === 'Response Issued'
        ? 'Asset screening complete'
        : packet.status === 'Needs Clarification'
          ? 'Not started'
          : 'Corridor record created';
  const auditEvents = [
    [`Created by ${packet.officer}`, '2026-05-10 10:42', 'Application record created from permit-linked intake.'],
    [`Submitted by ${packet.officer}`, '2026-05-10 11:30', `Status changed to ${packet.status}.`],
    ['Reviewed by DICRI Operations', '2026-05-10 12:05', `Completeness confirmed at ${packet.completeness}%.`],
    ['Last updated', '2026-05-12 09:10', packet.warning || 'No active clarification note.'],
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-700">Application Package Detail</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Controlled Intake Record</h1>
          <p className="mt-2 text-lg text-slate-600">Review the converted package without restarting the assisted intake workflow.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={onBack} className="rounded-xl border border-[#001B3D] px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-slate-50">Back to Applications</button>
          <button onClick={onAmend} className="rounded-xl bg-[#D4A100] px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-[#b98d00]">Amend Application</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card title="Application Summary" icon={FileText}>
          <SummaryRow label="Application ID" value={packet.id} />
          <SummaryRow label="CBYD Packet ID" value={packet.packetId} />
          <SummaryRow label="Permit Reference" value={packet.permitRef} />
          <SummaryRow label="Requester" value={packet.requester} />
          <SummaryRow label="Category" value={packet.workCategory} />
          <SummaryRow label="Status" value={packet.status} />
          <SummaryRow label="Market / Region" value={`${packet.country} / ${packet.state}`} />
          <SummaryRow label="State / LGA" value={`${packet.state} / ${packet.corridorLga || 'Port Harcourt'}`} />
        </Card>

        <Card title="Declared Work Corridor" icon={Route}>
          <SummaryRow label="Start Point / Cross Street" value={packet.corridorStartPoint || 'Garrison Junction'} />
          <SummaryRow label="End Point / Cross Street" value={packet.corridorEndPoint || 'Elekahia Road'} />
          <SummaryRow label="City / LGA" value={`${packet.corridorCity || 'Port Harcourt'} / ${packet.corridorLga || 'Port Harcourt'}`} />
          <SummaryRow label="Side of Road" value={packet.sideOfRoad || 'Unknown'} />
          <SummaryRow label="Screening Buffer" value={packet.screeningBuffer || 'Wider buffer applied'} />
          <SummaryRow label="Location Source" value={packet.locationSource || 'Assisted intake / permit reference'} />
          <SummaryRow label="Sketch / Markup Status" value={sketchStatus(packet)} />
        </Card>

        <Card title="Intake Completeness" icon={ClipboardCheck}>
          <div className="text-5xl font-black mb-4">{packet.completeness}%</div>
          <Progress value={packet.completeness} wide />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Required Complete</div>
              {completeItems.map((item) => <CheckLine key={item} label={item} />)}
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Optional Gaps / Clarification</div>
              {optionalGaps.length ? optionalGaps.map((item) => <div key={item} className="border-b border-slate-200 py-3 text-sm font-bold text-amber-800">{item}</div>) : <CheckLine label="No optional gaps recorded" />}
            </div>
          </div>
        </Card>

        <Card title="Documents" icon={Upload}>
          <UploadRow label="Permit File" file={`${packet.permitRef}.pdf`} done />
          <UploadRow label="Sketch / Markup" file={packet.sketchFileName || 'Not provided'} done={Boolean(packet.sketchFileName)} warning={!packet.sketchFileName} />
          <UploadRow label="Traffic Plan" file={packet.trafficImpact === 'No traffic impact' ? 'Optional' : 'traffic-plan.pdf'} done={packet.trafficImpact !== 'No traffic impact'} />
          <UploadRow label="Supporting Documents" file={packet.attachments > 2 ? `${packet.attachments - 2} supporting files` : 'No additional files'} done={packet.attachments > 2} />
        </Card>

        <Card title="Corridor Screening Status" icon={Map}>
          <Metric label="Corridor Record" value={screeningStatus} tone={screeningStatus === 'Not started' ? 'amber' : 'green'} />
          <Metric label="Asset Owner Count" value={owners.length} />
          <Metric label="Highest Corridor Conflict Risk" value={owners.some((owner) => owner.risk === 'High') ? 'High' : 'Low'} tone={owners.some((owner) => owner.risk === 'High') ? 'red' : 'green'} />
        </Card>

        <Card title="Likely Asset Owners / Notifications" icon={Bell}>
          <div className="space-y-3">
            {owners.map((owner) => (
              <div key={`${owner.name}-${owner.type}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 grid grid-cols-5 gap-3 items-center">
                <div className="col-span-2"><div className="font-black">{owner.name}</div><div className="text-sm text-slate-600">{owner.type}</div></div>
                <StatusBadge status={owner.risk} />
                <div className="text-sm"><span className="font-black text-slate-500">SLA</span><div>{owner.sla}</div></div>
                <div className="text-sm"><span className="font-black text-slate-500">Response</span><div>{owner.response}</div></div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Audit Trail" icon={History} className="xl:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditEvents.map(([actor, time, note]) => (
              <div key={`${actor}-${time}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="font-black">{actor}</div>
                <div className="mt-1 text-xs font-mono text-slate-500">{time}</div>
                <div className="mt-2 text-sm text-slate-700">{note}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-wrap gap-3">
        {applicationControlledActions(packet.status).map((action) => (
          <button key={action} onClick={action === 'Update Application' ? onAmend : undefined} className="rounded-xl border border-[#001B3D] px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#001B3D] hover:text-white">
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}

function PermitsPage({ records, search, setSearch, onOpen }) {
  const results = records.filter((record) => [record.permitRef, record.requester, record.location, record.state, record.contact].join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    <section className="space-y-6">
      <div><h1 className="text-4xl font-black tracking-tight">Permits</h1><p className="text-slate-600 mt-2 text-lg">Search permits and populate the selected intake context.</p></div>
      <div className="grid grid-cols-3 gap-5">
        <Card title="Permit Search" icon={Search}>
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100" placeholder="Permit, requester, corridor, state..." />
          <div className="mt-4 space-y-2">
            {results.slice(0, 4).map((record) => (
              <button key={record.id} onClick={() => onOpen(record, 1)} className="w-full rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50">
                <div className="font-black">{record.permitRef}</div>
                <div className="text-sm text-slate-600">{record.requester} / {record.state}</div>
              </button>
            ))}
          </div>
        </Card>
        <div className="col-span-2"><QueueTable rows={results} onOpen={(record) => onOpen(record, 1)} large /></div>
      </div>
    </section>
  );
}

function ReportsPage({ records, countryName }) {
  const ready = Math.round((records.filter((r) => r.status === 'Ready for Review').length / Math.max(records.length, 1)) * 100);
  const clarify = Math.round((records.filter((r) => r.status === 'Needs Clarification').length / Math.max(records.length, 1)) * 100);
  return (
    <section className="space-y-6">
      <div><h1 className="text-4xl font-black tracking-tight">Reports</h1><p className="text-slate-600 mt-2 text-lg">Operational reporting for {countryName} intake outcomes.</p></div>
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Market Intakes" value={records.length} sub={countryName} tone="blue" />
        <KpiCard label="Ready Rate" value={`${ready}%`} sub="Review" tone="green" />
        <KpiCard label="Clarification Rate" value={`${clarify}%`} sub="Action" tone="amber" />
        <KpiCard label="Owner High Risk" value={records.filter((r) => r.likelyOwners.some((o) => o.risk === 'High')).length} sub="Watch" tone="red" />
      </div>
      <Card title="Eligibility Outcome Mix" icon={Database}>
        <ReportBar label="Ready for DICRI Screening" value={ready || 1} tone="green" />
        <ReportBar label="Returned for Clarification" value={clarify || 1} tone="amber" />
        <ReportBar label="Draft / Incomplete" value={Math.max(100 - ready - clarify, 1)} tone="red" />
      </Card>
    </section>
  );
}

function IntakeWorkflow({ country, packet, step, nextStep, backStep, openDashboard, updatePacket, updateEligibility, toggleClassification, submitToDicri, setModal }) {
  const title = step === 10 ? 'Submitted to DICRI' : step === 9 ? 'Intake Completeness Review' : STEPS[step - 1];
  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-4xl font-black tracking-tight">{title}</h1>
        <p className="text-slate-600 mt-2 text-lg">Selected record: <span className="font-black">{packet.id}</span> / {packet.requester}</p>
      </div>
      {step === 1 && <StepOne packet={packet} updatePacket={updatePacket} />}
      {step === 2 && <StepTwo packet={packet} updatePacket={updatePacket} />}
      {step === 3 && <StepThree packet={packet} updateEligibility={updateEligibility} />}
      {step === 4 && <StepFour packet={packet} toggleClassification={toggleClassification} />}
      {step === 5 && <StepFive country={country} packet={packet} updatePacket={updatePacket} setModal={setModal} />}
      {step === 6 && <StepSix packet={packet} updatePacket={updatePacket} />}
      {step === 7 && <StepSeven packet={packet} updatePacket={updatePacket} />}
      {step === 8 && <StepEight packet={packet} updatePacket={updatePacket} />}
      {step === 9 && <ReviewStep packet={packet} updatePacket={updatePacket} submitToDicri={submitToDicri} />}
      {step === 10 && <SubmittedStep packet={packet} openDashboard={openDashboard} />}
      {step < 10 && (
        <div className="fixed bottom-0 left-[260px] right-[340px] bg-white/95 backdrop-blur border-t border-slate-200 p-5 flex items-center justify-between z-40">
          <button onClick={step === 1 ? openDashboard : backStep} className="rounded-xl border border-[#001B3D] px-10 py-3 font-black hover:bg-slate-50">{step === 1 ? 'Cancel' : '← Back'}</button>
          <div className="flex gap-3">
            <button className="rounded-xl border border-[#001B3D] px-8 py-3 font-black flex items-center gap-2"><HardDrive size={16} /> Save Draft</button>
            {step === 9 && <button onClick={() => updatePacket({ status: 'Needs Clarification', completeness: Math.min(packet.completeness, 72) })} className="rounded-xl border border-red-500 px-8 py-3 font-black text-red-600">Return for Clarification</button>}
            <button onClick={nextStep} className="rounded-xl bg-[#D4A100] px-10 py-3 font-black text-white shadow-lg hover:bg-[#b98d00]">{step === 9 ? 'Submit to DICRI' : 'Continue'} →</button>
          </div>
        </div>
      )}
    </section>
  );
}

function StepOne({ packet, updatePacket }) {
  const marketRegion = `${packet.country} / ${packet.state}`;
  const departmentOfficers = DEPARTMENT_OFFICERS[packet.agency] || OFFICERS;
  const updateAgency = (agency) => {
    const firstOfficer = (DEPARTMENT_OFFICERS[agency] || OFFICERS)[0];
    const [country, state] = marketForAgency(agency).split(' / ');
    updatePacket({ agency, officer: firstOfficer.name, officerId: firstOfficer.id, country, state });
  };
  const updateOfficer = (name) => {
    const officer = departmentOfficers.find((item) => item.name === name) || departmentOfficers[0];
    updatePacket({ officer: officer.name, officerId: officer.id });
  };
  const updateMarket = (value) => {
    const [country, state] = value.split(' / ');
    updatePacket({ country, state });
  };
  return (
    <div className="space-y-4">
      <FormSection number="1" title="Intake Authority Details">
        <ControlledSelect label="Intake Agency / Office" value={packet.agency} options={withCurrentOption(INTAKE_AGENCIES, packet.agency)} onChange={updateAgency} />
        <ControlledSelect label="Intake Officer Name" value={packet.officer} options={withCurrentOption(departmentOfficers.map((officer) => officer.name), packet.officer)} onChange={updateOfficer} />
        <Field label="Intake Officer ID" value={packet.officerId} />
        <ControlledSelect label="Request Channel" value={packet.channel} options={withCurrentOption(REQUEST_CHANNELS, packet.channel)} onChange={(channel) => updatePacket({ channel })} />
        <ControlledSelect label="Market / Region" value={marketRegion} options={withCurrentOption(MARKET_REGIONS, marketRegion)} onChange={updateMarket} />
        <Field label="Date Received" value="2026-05-12 10:42" />
      </FormSection>
      <FormSection number="2" title="Requester Details">
        <ControlledSelect label="Requester Type" value={packet.requesterType} options={withCurrentOption(REQUESTER_TYPES, packet.requesterType)} onChange={(requesterType) => updatePacket({ requesterType })} />
        <EditableField label="Company / Unit" value={packet.requester} onChange={(requester) => updatePacket({ requester })} flush />
        <EditableField label="Contact Person" value={packet.contact} onChange={(contact) => updatePacket({ contact })} flush />
        <EditableField label="Phone Number" value={packet.phone} onChange={(phone) => updatePacket({ phone })} flush />
        <EditableField label="Email Address" value={packet.email} type="email" onChange={(email) => updatePacket({ email })} flush />
        <EditableField label="Existing Permit Ref" value={packet.permitRef} onChange={(permitRef) => updatePacket({ permitRef })} flush />
      </FormSection>
    </div>
  );
}

function StepTwo({ packet, updatePacket }) {
  return (
    <div className="space-y-4">
      <FormSection number="2" title="Requester Details">
        <ControlledSelect label="Requester Type" value={packet.requesterType} options={withCurrentOption(REQUESTER_TYPES, packet.requesterType)} onChange={(requesterType) => updatePacket({ requesterType })} />
        <EditableField label="Company / Unit" value={packet.requester} onChange={(requester) => updatePacket({ requester })} flush />
        <EditableField label="Contact Person" value={packet.contact} onChange={(contact) => updatePacket({ contact })} flush />
        <EditableField label="Phone Number" value={packet.phone} onChange={(phone) => updatePacket({ phone })} flush />
        <EditableField label="Email Address" value={packet.email} type="email" onChange={(email) => updatePacket({ email })} flush />
        <EditableField label="Existing Permit Ref" value={packet.permitRef} onChange={(permitRef) => updatePacket({ permitRef })} flush />
        <div className="col-span-3 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-relaxed text-slate-700">
          <strong>Controlled identity capture:</strong> this record now drives all workflow screens, the side snapshot, owner context, and review scoring.
        </div>
      </FormSection>
      <FormSection number="2A" title="Declared Work Corridor">
        <EditableField label="Permit Reference" value={packet.permitRef} onChange={(permitRef) => updatePacket({ permitRef })} flush />
        <div className="col-span-2">
          <ControlledSelect label="Known / Permit-Linked Corridor" value={packet.location} options={withCurrentOption(CORRIDOR_SUGGESTIONS, packet.location)} onChange={(location) => updatePacket({ location })} />
        </div>
        <div className="col-span-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-500">Or define corridor manually</div>
        <EditableField label="Start Point / Cross Street" value={corridorValue(packet, 'corridorStartPoint', 'Garrison Junction')} onChange={(corridorStartPoint) => updatePacket({ corridorStartPoint })} flush />
        <EditableField label="End Point / Cross Street" value={corridorValue(packet, 'corridorEndPoint', 'Elekahia Road')} onChange={(corridorEndPoint) => updatePacket({ corridorEndPoint })} flush />
        <EditableField label="City / Town" value={corridorValue(packet, 'corridorCity', 'Port Harcourt')} onChange={(corridorCity) => updatePacket({ corridorCity })} flush />
        <EditableField label="State" value={packet.state || 'Rivers'} onChange={(state) => updatePacket({ state })} flush />
        <EditableField label="LGA" value={corridorValue(packet, 'corridorLga', 'Port Harcourt')} onChange={(corridorLga) => updatePacket({ corridorLga })} flush />
        <ControlledSelect label="Work Area Type" value={packet.workAreaType} options={WORK_AREA_TYPES} onChange={(workAreaType) => updatePacket({ workAreaType, eligibility: { ...packet.eligibility, corridor: workAreaType } })} />
        <ControlledSelect label="Ground Disturbance" value={packet.groundDisturbance} options={['Yes', 'No', 'Unsure']} onChange={(groundDisturbance) => updatePacket({ groundDisturbance, eligibility: { ...packet.eligibility, ground: groundDisturbance } })} />
        <EditableField label="Estimated Length" value={packet.estimatedLength || '2.4 km'} onChange={(estimatedLength) => updatePacket({ estimatedLength })} flush />
        <ControlledSelect label="Side of Road" value={packet.sideOfRoad || 'Unknown'} options={withCurrentOption(SIDE_OF_ROAD_OPTIONS, packet.sideOfRoad || 'Unknown')} onChange={(sideOfRoad) => updatePacket({ sideOfRoad })} />
        <ControlledSelect label="Screening Buffer" value={packet.screeningBuffer || 'Wider buffer applied'} options={withCurrentOption(SCREENING_BUFFER_OPTIONS, packet.screeningBuffer || 'Wider buffer applied')} onChange={(screeningBuffer) => updatePacket({ screeningBuffer })} />
        <ControlledSelect label="Location Source" value={packet.locationSource || 'Assisted intake / permit reference'} options={withCurrentOption(LOCATION_SOURCE_OPTIONS, packet.locationSource || 'Assisted intake / permit reference')} onChange={(locationSource) => updatePacket({ locationSource })} />
        {packet.sideOfRoad === 'Unknown' && <div className="col-span-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900">Side of road unknown; wider screening buffer may be applied.</div>}
        <div className="col-span-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          This declared corridor drives downstream owner screening, conflict risk, and notification requirements.
        </div>
      </FormSection>
    </div>
  );
}

function StepThree({ packet, updateEligibility }) {
  const questions = [
    ['ground', 'Does this request involve ground disturbance?', ['Yes', 'No', 'Unsure']],
    ['row', 'Is the work inside or near public right of way?', ['Yes', 'No', 'Near ROW', 'Unsure']],
    ['corridor', 'Is this a linear corridor or point excavation?', ['Linear Corridor', 'Point Excavation', 'Area / Polygon Work']],
    ['depthKnown', 'Is excavation depth known?', ['Yes', 'No', 'Partial']],
    ['ownersNotified', 'Are utility owners already notified?', ['Yes', 'No', 'Partial']],
  ];
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="CBYD Eligibility Controls" icon={Shield}>
        <div className="space-y-4">
          {questions.map(([key, label, options]) => (
            <SegmentedQuestion key={key} label={label} value={packet.eligibility[key]} options={options} onChange={(value) => updateEligibility(key, value)} />
          ))}
        </div>
      </Card>
      <Card title="Eligibility Guidance" icon={Info}>
        {['Excavation, trenching, boring, road cutting, grading, piling, drainage, and utility works are screened.', 'Low depth does not remove CBYD obligation.', 'Unknown depth or owner notifications reduce completeness.', 'DICRI applies redacted corridor screening before owner notification.'].map((item) => <CheckLine key={item} label={item} />)}
      </Card>
    </div>
  );
}

function StepFour({ packet, toggleClassification }) {
  return (
    <div className="grid grid-cols-3 gap-5">
      <Card title="Work Classification" icon={Layers} className="col-span-2">
        <div className="grid grid-cols-2 gap-4">
          {WORK_CLASSIFICATIONS.map((classification) => (
            <Selectable key={classification} title={classification} sub={classificationHint(classification)} selected={packet.classifications.includes(classification)} onClick={() => toggleClassification(classification)} />
          ))}
        </div>
      </Card>
      <Card title="Selected Scope" icon={ClipboardCheck}>
        {packet.classifications.map((item) => <CheckLine key={item} label={item} />)}
        <Metric label="Primary Work Category" value={packet.workCategory} />
      </Card>
    </div>
  );
}

function StepFive({ country, packet, updatePacket, setModal }) {
  return (
    <div className="grid grid-cols-5 gap-5">
      <Card title="Location Capture" icon={MapPin} className="col-span-3">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <ControlledSelect label="Work Area Type" value={packet.workAreaType} options={WORK_AREA_TYPES} onChange={(workAreaType) => updatePacket({ workAreaType, eligibility: { ...packet.eligibility, corridor: workAreaType } })} />
          <Field label="Country / Market" value={packet.country} />
          <EditableField label="State / Region" value={packet.state} onChange={(state) => updatePacket({ state })} flush />
          <EditableField label="Permit Reference" value={packet.permitRef} onChange={(permitRef) => updatePacket({ permitRef })} />
          <div className="col-span-2">
            <ControlledSelect label="Known / Permit-Linked Corridor" value={packet.location} options={withCurrentOption(CORRIDOR_SUGGESTIONS, packet.location)} onChange={(location) => updatePacket({ location })} />
          </div>
          <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-500">Or define corridor manually</div>
          <EditableField label="Start Point / Cross Street" value={corridorValue(packet, 'corridorStartPoint', 'Garrison Junction')} onChange={(corridorStartPoint) => updatePacket({ corridorStartPoint })} flush />
          <EditableField label="End Point / Cross Street" value={corridorValue(packet, 'corridorEndPoint', 'Elekahia Road')} onChange={(corridorEndPoint) => updatePacket({ corridorEndPoint })} flush />
          <EditableField label="City / Town" value={corridorValue(packet, 'corridorCity', 'Port Harcourt')} onChange={(corridorCity) => updatePacket({ corridorCity })} flush />
          <EditableField label="LGA" value={corridorValue(packet, 'corridorLga', 'Port Harcourt')} onChange={(corridorLga) => updatePacket({ corridorLga })} flush />
          <ControlledSelect label="Side of Road" value={packet.sideOfRoad || 'Unknown'} options={withCurrentOption(SIDE_OF_ROAD_OPTIONS, packet.sideOfRoad || 'Unknown')} onChange={(sideOfRoad) => updatePacket({ sideOfRoad })} />
          <EditableField label="Estimated Length" value={packet.estimatedLength || '2.4 km'} onChange={(estimatedLength) => updatePacket({ estimatedLength })} flush />
          <ControlledSelect label="Screening Buffer" value={packet.screeningBuffer || 'Wider buffer applied'} options={withCurrentOption(SCREENING_BUFFER_OPTIONS, packet.screeningBuffer || 'Wider buffer applied')} onChange={(screeningBuffer) => updatePacket({ screeningBuffer })} />
          <ControlledSelect label="Location Source" value={packet.locationSource || 'Assisted intake / permit reference'} options={withCurrentOption(LOCATION_SOURCE_OPTIONS, packet.locationSource || 'Assisted intake / permit reference')} onChange={(locationSource) => updatePacket({ locationSource })} />
          <div className="col-span-2 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            This declared corridor drives downstream owner screening, conflict risk, and notification requirements.
          </div>
          {packet.sideOfRoad === 'Unknown' && <div className="col-span-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900">Side of road unknown; wider screening buffer may be applied.</div>}
        </div>
        <CorridorMap packet={packet} onOpen={() => setModal({ type: 'map', packet })} />
      </Card>
      <Card title="Likely Asset Owners" icon={Building2} className="col-span-2">
        <OwnerPanel owners={packet.likelyOwners} />
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 flex gap-3"><AlertTriangle size={18} />Illustrative screening map only; sensitive geometry is redacted.</div>
      </Card>
    </div>
  );
}

function StepSix({ packet, updatePacket }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <FormSection number="6" title="Methods & Dimensions" compact>
        <ControlledSelect label="Excavation Method" value={packet.method} options={['Open trenching', 'Micro-trenching', 'Directional boring', 'Vacuum excavation', 'Road cutting / milling', 'Piling / foundation excavation']} onChange={(value) => updatePacket({ method: value })} />
        <ControlledSelect label="Estimated Depth Range" value={packet.depthRange} options={['Under 0.3 m', '0.3 m - 0.6 m', '0.6 m - 1.2 m', '1.2 m - 2 m', 'Over 2 m']} onChange={(value) => updatePacket({ depthRange: value })} />
        <ControlledSelect label="Route Length Range" value={packet.lengthRange} options={['Under 100 m', '100 m - 500 m', '0.5 km - 1 km', '1 km - 3 km', 'Area / compound works']} onChange={(value) => updatePacket({ lengthRange: value })} />
        <ControlledSelect label="Surface Type" value={packet.surfaceType} options={['Asphalt roadway / shoulder', 'Paved arterial road', 'Urban road reserve', 'Road shoulder', 'Mixed paved and unpaved']} onChange={(value) => updatePacket({ surfaceType: value })} />
        <ControlledSelect label="Equipment Class" value={packet.equipmentClass} options={['Hand tools only', 'Light excavator + manual finish', 'Vacuum truck + hand tools', 'Micro-trencher', 'Road saw + milling machine', 'Piling rig + excavator']} onChange={(value) => updatePacket({ equipmentClass: value })} />
        <ControlledSelect label="Traffic Impact" value={packet.trafficImpact} options={withCurrentOption(TRAFFIC_IMPACT_OPTIONS, packet.trafficImpact)} onChange={(value) => updatePacket({ trafficImpact: value })} />
        <ControlledSelect label="Planned Start Window" value={packet.startWindow} options={withCurrentOption(START_WINDOW_OPTIONS, packet.startWindow)} onChange={(value) => updatePacket({ startWindow: value })} />
        <ControlledSelect label="Restoration Requirement" value={packet.restoration} options={['Same-day reinstatement', 'Temporary reinstatement then permanent patch', 'Permanent road reinstatement', 'Engineered reinstatement']} onChange={(value) => updatePacket({ restoration: value })} />
      </FormSection>
      <Card title="Method Risk Controls" icon={Shield}>
        <CheckLine label="Method and depth drive screening buffer." />
        <CheckLine label="Road impacts increase owner notification priority." />
        <CheckLine label="Restoration requirement supports regulator review." />
        <CheckLine label="Sensitive utility detail remains hidden from demo view." />
      </Card>
    </div>
  );
}

function StepSeven({ packet, updatePacket }) {
  const sla = calculateScheduleImplications(packet);
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Project Schedule" icon={Calendar}>
        <EditableField label="Expected Start Date" value={packet.expectedStart} type="date" onChange={(value) => updatePacket({ expectedStart: value })} />
        <EditableField label="Expected Completion Date" value={packet.expectedCompletion} type="date" onChange={(value) => updatePacket({ expectedCompletion: value })} />
        <ControlledSelect label="Start Window" value={packet.startWindow} options={withCurrentOption(START_WINDOW_OPTIONS, packet.startWindow)} onChange={(value) => updatePacket({ startWindow: value })} />
        <div className="mt-4">
          <ControlledSelect label="Traffic Impact" value={packet.trafficImpact} options={withCurrentOption(TRAFFIC_IMPACT_OPTIONS, packet.trafficImpact)} onChange={(value) => updatePacket({ trafficImpact: value })} />
        </div>
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-800">
          Near-term work windows trigger higher-priority owner notifications.
        </div>
      </Card>
      <Card title="SLA Implications" icon={Zap}>
        <Metric label="Owner Response SLA" value={sla.ownerResponseSla} tone={priorityTone(sla.ownerResponseSla)} />
        <Metric label="Recommended Screening Priority" value={sla.screeningPriority} tone={priorityTone(sla.screeningPriority)} />
        <Metric label="Expected Completion" value={packet.expectedCompletion} />
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
          Schedule urgency influences owner response SLA and screening priority.
        </div>
      </Card>
    </div>
  );
}

function StepEight({ packet, updatePacket }) {
  const sketchReceived = Boolean(packet.sketchFileName);
  const sketchMissingByAssumption = Boolean(packet.sketchUnavailable);
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Documentation" icon={Upload}>
        <UploadRow label="Permit Application" file={`${packet.permitRef}.pdf`} done={packet.attachments >= 1} />
        <UploadRow label="Route Sketch / Map" file={sketchReceived ? packet.sketchFileName : sketchMissingByAssumption ? 'Not provided - documented assumption' : 'Pending'} done={sketchReceived} warning={!sketchReceived} />
        <UploadRow label="Traffic Management Plan" file={packet.trafficImpact === 'No traffic impact' ? 'Optional' : 'traffic-plan.pdf'} done={packet.trafficImpact !== 'No traffic impact'} />
        <UploadRow label="Method Statement" file={packet.completeness > 80 ? 'method-statement.pdf' : 'Pending'} done={packet.completeness > 80} warning={packet.completeness <= 80} />
      </Card>
      <Card title="Site Sketch / Corridor Markup" icon={Map}>
        <p className="mb-4 text-sm leading-relaxed text-slate-600">
          Upload any sketch, marked-up map, route drawing, or excavation diagram that helps define the declared work area.
        </p>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
          <div className="text-xs font-black uppercase tracking-widest text-slate-500">Supported demo upload types</div>
          <div className="mt-2 text-sm font-bold text-slate-700">PDF, JPG / PNG, KMZ / KML, DWG / CAD</div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => updatePacket({ sketchFileName: `corridor-markup-${packet.permitRef || 'draft'}.pdf`, attachments: Math.max(packet.attachments || 0, 2) })}
              className="rounded-xl bg-[#001B3D] px-5 py-3 text-sm font-black text-white"
            >
              Upload Sketch / Markup
            </button>
            {(sketchReceived || sketchMissingByAssumption) && (
              <button
                onClick={() => updatePacket({ sketchFileName: '', sketchUnavailable: false, attachments: Math.min(packet.attachments || 0, 1) })}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700"
              >
                Remove / Replace File
              </button>
            )}
          </div>
          <label className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700">
            <input
              type="checkbox"
              checked={sketchMissingByAssumption}
              onChange={(event) => updatePacket({ sketchUnavailable: event.target.checked, attachments: event.target.checked ? Math.min(packet.attachments || 0, 1) : packet.attachments })}
              className="h-4 w-4"
            />
            Sketch not available
          </label>
          <div className={`mt-4 rounded-xl border p-4 text-sm font-bold ${sketchReceived ? 'border-green-200 bg-green-50 text-green-800' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>
            {sketchReceived ? 'Sketch / corridor markup received.' : 'Optional sketch not provided; wider screening buffer may be applied.'}
          </div>
        </div>
      </Card>
      <Card title="Packet Completeness" icon={ClipboardCheck}>
        <Metric label="Current Completeness" value={`${packet.completeness}%`} />
        <Metric label="Sketch / Markup" value={sketchStatus(packet)} tone={sketchReceived ? 'green' : 'amber'} />
        <CheckLine label="Requester identity captured" />
        <CheckLine label="Ground disturbance decision captured" />
        <CheckLine label="Likely asset owners identified" />
        <CheckLine label="Schedule provided" />
        {!sketchReceived && <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900">Optional sketch not provided; wider screening buffer may be applied.</div>}
      </Card>
    </div>
  );
}

function ReviewStep({ packet, updatePacket, submitToDicri }) {
  const ready = packet.completeness >= 80 && packet.eligibility.ground === 'Yes';
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Request Summary" icon={FileText}>
        <SummaryRow label="Requester" value={packet.requester} />
        <SummaryRow label="Permit Ref" value={packet.permitRef} />
        <SummaryRow label="Work Category" value={packet.classifications.join(', ')} />
        <SummaryRow label="Location" value={packet.location} />
        <SummaryRow label="Side of Road" value={packet.sideOfRoad || 'Unknown'} />
        <SummaryRow label="Screening Buffer" value={packet.screeningBuffer || 'Wider buffer applied'} />
        <SummaryRow label="Sketch / Markup" value={sketchStatus(packet)} />
        <SummaryRow label="Method" value={packet.method} />
        <SummaryRow label="Depth" value={packet.depthRange} />
        <SummaryRow label="Start Date" value={packet.expectedStart} />
      </Card>
      <div className="space-y-5">
        <Card title="Intake Completeness" icon={ClipboardCheck}>
          <div className="text-6xl font-black mb-4">{packet.completeness}%</div>
          <Progress value={packet.completeness} wide />
          <div className={`mt-5 rounded-xl border p-4 text-sm ${ready ? 'border-green-200 bg-green-50 text-green-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}><strong>{ready ? 'Ready for DICRI' : 'Clarification Recommended'}</strong><br />{packet.warning}</div>
        </Card>
        <Card title="Submission Decision" icon={Shield}>
          <button onClick={submitToDicri} className="w-full rounded-xl bg-[#0B7F3A] px-5 py-3 font-black text-white mb-3">Submit to DICRI</button>
          <button onClick={() => updatePacket({ status: 'Needs Clarification', completeness: Math.min(packet.completeness, 72) })} className="w-full rounded-xl border border-amber-500 px-5 py-3 font-black text-amber-700 mb-3">Return for Clarification</button>
          <button onClick={() => updatePacket({ status: 'Not CBYD', completeness: packet.completeness })} className="w-full rounded-xl border border-red-500 px-5 py-3 font-black text-red-700">Mark Not CBYD</button>
        </Card>
      </div>
      <Card title="Intake Checklist" icon={CheckCircle2} className="col-span-2">
        {['Ground disturbance decision captured', 'Requester contact captured', 'Work location provided', 'Likely asset owners identified', 'Schedule provided', 'Controlled handoff decision available'].map((label) => <ChecklistRow key={label} label={label} />)}
      </Card>
    </div>
  );
}

function SubmittedStep({ packet, openDashboard }) {
  const finalCompleteness = submittedCompleteness(packet);
  const sketchReceived = Boolean(packet.sketchFileName);
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-[#0B7F3A] text-white flex items-center justify-center"><Check size={48} /></div>
          <div><div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-black uppercase text-green-800 mb-2">Success</div><h2 className="text-3xl font-black text-[#0B7F3A]">Intake Packet Submitted</h2><p className="text-slate-600 mt-1">The selected request has been handed off to DICRI Operations.</p></div>
        </div>
        <div className="text-right"><div className="text-xs font-black uppercase text-slate-500">Packet Reference</div><div className="text-4xl font-black text-[#0B7F3A]">{packet.packetId}</div></div>
      </div>
      <Card title="Submitted Package Status" icon={ClipboardCheck}>
        <div className="grid grid-cols-3 gap-4">
          <Metric label="Status" value="Submitted to DICRI" tone="green" />
          <Metric label="Intake Process" value="Complete" tone="green" />
          <Metric label="Packet Completeness" value={`${finalCompleteness}%`} tone={sketchReceived ? 'green' : 'amber'} />
          <Metric label="Packet Reference" value={packet.packetId} />
          <Metric label="Sketch / Markup" value={sketchReceived ? 'Received' : 'Not Provided'} tone={sketchReceived ? 'green' : 'amber'} />
          <Metric label="Declared Corridor" value={packet.location} />
        </div>
        {!sketchReceived && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900">
            Submitted with optional sketch missing. DICRI may proceed using wider screening assumptions or request clarification if needed.
          </div>
        )}
      </Card>
      <HandoffTimeline />
      <div className="flex justify-end gap-3 pt-2">
        <button className="rounded-xl border border-[#001B3D] px-8 py-3 font-black"><Download size={16} className="inline mr-2" />Download / Print Summary</button>
        <button onClick={openDashboard} className="rounded-xl bg-[#D4A100] px-8 py-3 font-black text-white">Return to Dashboard</button>
      </div>
    </div>
  );
}

function CorridorMap({ packet, onOpen }) {
  return (
    <button onClick={onOpen} className="h-[360px] w-full rounded-2xl border border-slate-200 bg-[#071A33] overflow-hidden relative text-left">
      <svg viewBox="0 0 900 420" className="absolute inset-0 h-full w-full">
        <rect width="900" height="420" fill="#071A33" />
        {[70, 140, 210, 280, 350].map((y) => <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="rgba(255,255,255,0.06)" />)}
        {[120, 260, 420, 580, 740].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="420" stroke="rgba(255,255,255,0.06)" />)}
        <path d="M55 210 H850" stroke="rgba(148,163,184,0.18)" strokeWidth="42" />
        <path d="M170 30 V390" stroke="rgba(148,163,184,0.16)" strokeWidth="38" />
        <path d="M55 320 C170 220 270 245 380 190 S630 110 845 185" fill="none" stroke="rgba(34,197,94,0.20)" strokeWidth="48" strokeLinecap="round" />
        <path d="M55 320 C170 220 270 245 380 190 S630 110 845 185" fill="none" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" />
        <path d="M55 320 C170 220 270 245 380 190 S630 110 845 185" fill="none" stroke="#86EFAC" strokeWidth="4" strokeLinecap="round" strokeDasharray="18 10" />
        <path d="M505 72 C500 128 512 172 506 226 S498 300 514 350" stroke="#A855F7" strokeWidth="9" strokeLinecap="round" strokeDasharray="12 10" />
        <path d="M245 82 H760" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" strokeDasharray="12 12" />
        <path d="M122 48 V390" stroke="#3B82F6" strokeWidth="9" strokeLinecap="round" strokeDasharray="14 12" />
        <circle cx="510" cy="210" r="92" fill="#EF4444" fillOpacity="0.10" stroke="#EF4444" strokeWidth="3" strokeDasharray="9 8" />
        <circle cx="510" cy="210" r="8" fill="#EF4444" stroke="white" strokeWidth="3" />
        <text x="70" y="190" fill="rgba(255,255,255,0.58)" fontSize="13" fontWeight="900" letterSpacing="2">PRIMARY ROAD CORRIDOR</text>
        <text x="185" y="80" fill="rgba(255,255,255,0.48)" fontSize="12" fontWeight="900" letterSpacing="2" transform="rotate(90 185 80)">CROSS STREET</text>
        <line x1="604" y1="132" x2="575" y2="158" stroke="#FCA5A5" strokeWidth="1.5" strokeDasharray="4 4" />
        <rect x="558" y="103" width="230" height="28" rx="10" fill="#0B1F3A" stroke="rgba(252,165,165,0.35)" />
        <text x="574" y="121" fill="#FCA5A5" fontSize="11" fontWeight="900" letterSpacing="1.6">CONFLICT SCREENING ZONE</text>
        <text x="538" y="240" fill="#FCA5A5" fontSize="12" fontWeight="900" letterSpacing="2">{packet.permitRef}</text>
        {[
          ['Water', 122, 336, 66, 365, '#3B82F6'],
          ['Sewer', 506, 226, 560, 308, '#A855F7'],
          ['Gas', 650, 82, 640, 43, '#F59E0B'],
          ['Fiber', 742, 178, 760, 222, '#22C55E'],
        ].map(([label, x, y, labelX, labelY, color]) => (
          <g key={label}>
            <line x1={x} y1={y} x2={labelX - 8} y2={labelY - 4} stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="10" fill={color} stroke="#071A33" strokeWidth="4" />
            <rect x={labelX - 8} y={labelY - 16} width="72" height="24" rx="8" fill="#0B1F3A" stroke="rgba(255,255,255,0.16)" />
            <text x={labelX} y={labelY} fill="white" fontSize="10" fontWeight="900" letterSpacing="1.4">{label}</text>
          </g>
        ))}
        <circle cx="55" cy="320" r="8" fill="#22C55E" stroke="#071A33" strokeWidth="3" />
        <circle cx="845" cy="185" r="8" fill="#22C55E" stroke="#071A33" strokeWidth="3" />
        <g transform="translate(34 346)">
          <rect width="832" height="36" rx="12" fill="#0B1F3A" stroke="rgba(255,255,255,0.14)" />
          <text x="14" y="22" fill="#CBD5E1" fontSize="9" fontWeight="900" letterSpacing="1.4">LEGEND</text>
          {[
            ['#22C55E', 'Fiber'],
            ['#3B82F6', 'Water'],
            ['#F59E0B', 'Gas'],
            ['#A855F7', 'Sewer'],
            ['#94A3B8', 'Gray band = Declared corridor'],
            ['#EF4444', 'Red dashed circle = Conflict screening zone'],
          ].map(([color, label], index) => {
            const positions = [78, 150, 224, 292, 374, 590];
            const x = positions[index];
            return (
              <g key={label} transform={`translate(${x} 21)`}>
                <circle cx="0" cy="0" r="4" fill={color} />
                <text x="9" y="3" fill="#E2E8F0" fontSize="8" fontWeight="800">{label}</text>
              </g>
            );
          })}
        </g>
        <text x="42" y="405" fill="#CBD5E1" fontSize="10" fontWeight="900" letterSpacing="1.5">Illustrative screening map — sensitive geometry redacted.</text>
      </svg>
      <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-[#0B1F3A]/90 p-5 text-white shadow-xl max-w-xs">
        <div className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2"><Map size={17} className="text-blue-400" /> Corridor Screening</div>
        <p className="text-[11px] uppercase tracking-widest text-blue-100/70 leading-relaxed">{packet.id} / {packet.workAreaType} / {packet.state}</p>
        <p className="mt-2 text-xs font-bold leading-snug text-white">{packet.location}</p>
      </div>
    </button>
  );
}

function OwnerPanel({ owners }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs font-bold leading-relaxed text-blue-900">
        Corridor conflict risk reflects spatial relationship to the declared work area and screening buffer, not asset type alone.
      </div>
      {owners.map((owner) => (
        <div key={`${owner.name}-${owner.type}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div><div className="font-black">{owner.name}</div><div className="text-sm text-slate-600">{owner.type}</div></div>
            <div className="text-right">
              <div className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-500">Corridor Conflict Risk</div>
              <StatusBadge status={owner.risk} />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div><span className="font-black text-slate-500">Response</span><div>{owner.response}</div></div>
            <div><span className="font-black text-slate-500">SLA</span><div>{owner.sla}</div></div>
          </div>
          {owner.reason && <div className="mt-3 rounded-lg border border-white bg-white px-3 py-2 text-xs font-bold text-slate-700">{owner.reason}</div>}
        </div>
      ))}
    </div>
  );
}

function HandoffTimeline() {
  const items = ['Request Received', 'Intake Reviewed', 'Packet Created', 'Submitted to DICRI', 'Corridor Creation', 'Asset Screening', 'Response Issued'];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        {items.map((item, idx) => {
          const done = idx < 4;
          return (
            <div key={item} className="flex-1 flex items-center">
              <div className="flex flex-col items-center text-center w-full">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center font-black ${done ? 'bg-[#0B7F3A] text-white' : 'bg-slate-200 text-slate-400'}`}>{done ? <Check size={18} /> : idx + 1}</div>
                <div className="mt-2 text-xs font-black leading-tight">{item}</div>
                <div className="text-xs text-slate-500">{done ? 'Demo now' : 'Pending'}</div>
              </div>
              {idx < items.length - 1 && <div className={`h-1 flex-1 ${done ? 'bg-[#0B7F3A]' : 'bg-slate-300'}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailModal({ modal, close }) {
  const packet = modal.packet || INTAKES.find((record) => record.id === modal.notification?.intakeId);
  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 bg-[#062247] text-white flex items-start justify-between">
          <div><p className="text-xs font-black uppercase tracking-widest text-blue-100/70">{modal.type === 'notification' ? 'Notification Detail' : 'Screening Map'}</p><h2 className="text-2xl font-black mt-1">{modal.notification?.title || packet?.id}</h2></div>
          <button onClick={close} className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center"><X size={18} /></button>
        </div>
        <div className="p-5 space-y-4">
          {modal.notification && <p className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-900">{modal.notification.body}</p>}
          {packet && (
            <div className="grid grid-cols-2 gap-4">
              <SummaryRow label="Intake" value={packet.id} />
              <SummaryRow label="Requester" value={packet.requester} />
              <SummaryRow label="Permit" value={packet.permitRef} />
              <SummaryRow label="Market" value={`${packet.country} / ${packet.state}`} />
              <SummaryRow label="Status" value={packet.status} />
              <SummaryRow label="Warning" value={packet.warning} />
            </div>
          )}
          {modal.type === 'map' && packet && <CorridorMap packet={packet} onOpen={() => {}} />}
        </div>
      </div>
    </div>
  );
}

function FormSection({ number, title, children, compact }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${compact ? '' : 'space-y-5'}`}><h2 className="text-xl font-black mb-4 flex items-center gap-3"><span className="h-8 w-8 rounded-lg bg-[#062247] text-white flex items-center justify-center text-sm">{number}</span>{title}</h2><div className="grid grid-cols-3 gap-4">{children}</div></div>;
}

function Card({ title, icon: Icon, children, className = '' }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}><h2 className="text-xl font-black mb-5 flex items-center gap-2"><Icon size={20} /> {title}</h2>{children}</div>;
}

function Field({ label, value, className = '' }) {
  return <div className={className}><label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</label><input value={value || ''} readOnly className="min-h-[46px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium outline-none" /></div>;
}

function EditableField({ label, value, onChange, type = 'text', flush = false }) {
  return <div className={flush ? '' : 'mb-4'}><label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</label><input value={value || ''} type={type} onChange={(event) => onChange(event.target.value)} className="min-h-[46px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" /></div>;
}

function ControlledSelect({ label, value, options, onChange }) {
  return <div><label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</label><select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-[46px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-100">{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}

function Select({ value, onChange, options }) {
  return <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100">{options.map((option) => <option key={option}>{option}</option>)}</select>;
}

function SegmentedQuestion({ label, value, options, onChange }) {
  return (
    <div>
      <div className="font-black mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => <button key={option} onClick={() => onChange(option)} className={`rounded-xl border px-4 py-2 text-sm font-black ${value === option ? 'border-[#0B7F3A] bg-green-50 text-green-800' : 'border-slate-200 bg-white text-slate-600'}`}>{option}</button>)}
      </div>
    </div>
  );
}

function Selectable({ title, sub, selected, onClick }) {
  return <button onClick={onClick} className={`rounded-xl border p-5 text-left ${selected ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'}`}><div className="flex items-center justify-between"><h3 className="font-black">{title}</h3>{selected && <CheckCircle2 className="text-green-700" size={20} />}</div><p className="text-sm text-slate-600 mt-2">{sub}</p></button>;
}

function ReportBar({ label, value, tone }) {
  const color = tone === 'green' ? 'bg-green-600' : tone === 'red' ? 'bg-red-500' : 'bg-[#D4A100]';
  return <div className="py-4 border-b border-slate-200 last:border-0"><div className="flex items-center justify-between mb-2"><span className="font-bold">{label}</span><span className="font-black">{value}%</span></div><div className="h-2 rounded-full bg-slate-200 overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${value}%` }} /></div></div>;
}

function KpiCard({ label, value, sub, tone, icon: Icon }) {
  const toneClass = tone === 'green' ? 'text-green-700 bg-green-50 border-green-200' : tone === 'amber' ? 'text-amber-700 bg-amber-50 border-amber-200' : tone === 'red' ? 'text-red-700 bg-red-50 border-red-200' : 'text-blue-700 bg-blue-50 border-blue-200';
  return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">{Icon && <Icon size={22} className="mx-auto mb-3 text-[#062247]" />}<p className="text-base mb-3">{label}</p><div className="text-4xl font-black mb-2">{value}</div><span className={`inline-block rounded-lg border px-3 py-1 text-xs font-black ${toneClass}`}>{sub}</span></div>;
}

function MixCard({ icon: Icon, label, value }) {
  return <div className="rounded-xl bg-slate-50 border border-slate-200 p-5"><Icon size={22} className="text-blue-600 mb-4" /><div className="text-3xl font-black">{value}</div><div className="text-sm text-slate-600 mt-1">{label}</div></div>;
}

function Progress({ value, wide }) {
  return <div className={wide ? 'w-full' : 'w-32'}><div className="mb-1 text-xs font-black">{value}%</div><div className="h-2 rounded-full bg-slate-200 overflow-hidden"><div className="h-full bg-[#D4A100]" style={{ width: `${value}%` }} /></div></div>;
}

function StatusBadge({ status }) {
  const cls = status === 'Ready for Review' || status === 'Low' || status === 'On Track'
    ? 'bg-green-100 text-green-700'
    : status === 'Needs Clarification' || status === 'Draft Intake Request' || status === 'Medium' || status === 'Warning'
      ? 'bg-amber-100 text-amber-700'
      : status === 'High' || status === 'Not CBYD' || status === 'Exception'
        ? 'bg-red-100 text-red-700'
        : status === 'Submitted to DICRI'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-slate-100 text-slate-700';
  return <span className={`rounded-lg px-3 py-1 text-xs font-black ${cls}`}>{status}</span>;
}

function SnapshotItem({ label, value, badge, tone }) {
  const cls = tone === 'green' ? 'bg-green-100 text-green-700' : tone === 'red' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700';
  return <div className="border-b border-slate-200 pb-4"><div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</div>{badge ? <span className={`rounded-lg px-3 py-1 text-xs font-black ${cls}`}>{value}</span> : <div className="text-base font-black leading-snug">{value}</div>}</div>;
}

function CheckLine({ label }) {
  return <div className="flex items-center gap-3 border-b border-slate-200 py-3 last:border-0"><span className="h-5 w-5 rounded bg-green-100 text-green-700 flex items-center justify-center"><Check size={15} /></span><span>{label}</span></div>;
}

function Metric({ label, value, tone }) {
  const color = tone === 'red' ? 'text-red-700 bg-red-50 border-red-200' : tone === 'amber' ? 'text-amber-700 bg-amber-50 border-amber-200' : tone === 'green' ? 'text-green-700 bg-green-50 border-green-200' : 'text-blue-700 bg-blue-50 border-blue-200';
  return <div className="flex items-center justify-between border-b border-slate-200 py-4"><span className="font-bold text-slate-600">{label}</span><span className={`rounded-lg border px-3 py-1 font-black ${color}`}>{value}</span></div>;
}

function UploadRow({ label, file, done, warning }) {
  return <div className="flex items-center justify-between border-b border-slate-200 py-4"><div><div className="font-black">{label}</div><div className="text-sm text-slate-600">{file}</div></div><span className={`rounded-lg px-3 py-1 text-xs font-black ${done ? 'bg-green-100 text-green-700' : warning ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{done ? 'Attached' : warning ? 'Pending' : 'Optional'}</span></div>;
}

function SummaryRow({ label, value }) {
  return <div className="grid grid-cols-2 gap-4 border-b border-slate-200 py-3"><div className="font-black">{label}</div><div>{value}</div></div>;
}

function ChecklistRow({ label }) {
  return <div className="flex items-center justify-between border-b border-slate-200 py-3"><div className="flex items-center gap-3"><CheckCircle2 className="text-green-700" size={20} /><span>{label}</span></div><span className="rounded-lg bg-green-100 px-3 py-1 text-xs font-black text-green-700">Completed</span></div>;
}

function filterRecords(records, filters) {
  const search = filters.search.toLowerCase();
  return records.filter((record) => {
    const searchOk = !search || [record.id, record.requester, record.location, record.permitRef, record.contact].join(' ').toLowerCase().includes(search);
    const stateOk = filters.state === 'All' || record.state === filters.state;
    const categoryOk = filters.category === 'All' || record.workCategory === filters.category;
    const statusOk = filters.status === 'All' || record.status === filters.status;
    return searchOk && stateOk && categoryOk && statusOk;
  });
}

function withCurrentOption(options, current) {
  return current && !options.includes(current) ? [current, ...options] : options;
}

const PRIORITY_ORDER = ['Standard', 'Medium', 'High', 'Urgent', 'Critical'];

function increasePriority(priority) {
  const index = PRIORITY_ORDER.indexOf(priority);
  return PRIORITY_ORDER[Math.min(index + 1, PRIORITY_ORDER.length - 1)] || priority;
}

function basePriorityForStartWindow(startWindow) {
  if (startWindow === 'Within 48 hours') return 'Critical';
  if (startWindow === 'Within 7 days') return 'Urgent';
  if (startWindow === 'Within 14 days' || startWindow === '8-14 days') return 'High';
  if (startWindow === 'Within 21 days' || startWindow === '15-30 days') return 'Medium';
  return 'Standard';
}

function isFourteenDaysOrLess(startWindow) {
  return ['Within 48 hours', 'Within 7 days', 'Within 14 days', '8-14 days'].includes(startWindow);
}

function calculateScheduleImplications(packet) {
  let ownerResponseSla = basePriorityForStartWindow(packet.startWindow);
  if (['Full road closure', 'Emergency works'].includes(packet.trafficImpact)) {
    ownerResponseSla = increasePriority(ownerResponseSla);
  } else if (packet.trafficImpact === 'Multi-lane restriction' && isFourteenDaysOrLess(packet.startWindow)) {
    ownerResponseSla = increasePriority(ownerResponseSla);
  }

  const screeningPriorityBySla = {
    Critical: 'Critical',
    Urgent: 'High',
    High: 'High',
    Medium: 'Medium',
    Standard: 'Standard',
  };

  return {
    ownerResponseSla,
    screeningPriority: screeningPriorityBySla[ownerResponseSla],
  };
}

function priorityTone(priority) {
  if (priority === 'Critical' || priority === 'Urgent') return 'red';
  if (priority === 'High' || priority === 'Medium') return 'amber';
  if (priority === 'Standard') return 'green';
  return 'blue';
}

function corridorValue(packet, key, fallback) {
  return packet[key] || fallback;
}

function generatedCorridor(packet) {
  const start = corridorValue(packet, 'corridorStartPoint', 'Garrison Junction');
  const end = corridorValue(packet, 'corridorEndPoint', 'Elekahia Road');
  const city = corridorValue(packet, 'corridorCity', packet.state === 'Lagos' ? 'Lagos' : 'Port Harcourt');
  return `${start} to ${end}, ${city}`;
}

function normalizePacketPatch(packet, patch) {
  const manualFields = ['corridorStartPoint', 'corridorEndPoint', 'corridorCity'];
  const next = { ...packet, ...patch };
  const normalized = { ...next };

  if (manualFields.some((field) => Object.prototype.hasOwnProperty.call(patch, field))) {
    normalized.location = generatedCorridor(normalized);
  }

  if (Object.prototype.hasOwnProperty.call(patch, 'sideOfRoad')) {
    if (patch.sideOfRoad === 'Unknown') {
      normalized.screeningBuffer = 'Wider buffer applied';
      normalized.warning = 'Side of road unknown; wider screening buffer may be applied.';
    } else {
      normalized.screeningBuffer = 'Side-specific buffer';
      normalized.warning = 'Side of road captured; side-specific screening buffer applied.';
    }
  }

  if (Object.prototype.hasOwnProperty.call(patch, 'sketchFileName') && patch.sketchFileName) {
    normalized.sketchUnavailable = false;
  }

  if (Object.prototype.hasOwnProperty.call(patch, 'sketchUnavailable') && patch.sketchUnavailable) {
    normalized.sketchFileName = '';
    normalized.warning = 'Optional sketch not provided; wider screening buffer may be applied.';
  }

  return normalized;
}

function sketchStatus(packet) {
  if (packet.sketchFileName) return 'Received';
  if (packet.sketchUnavailable) return 'Not Provided';
  return 'Pending';
}

function applicationActionLabel(status) {
  const labels = {
    'Draft Intake Request': 'Continue Intake',
    'Needs Clarification': 'Resolve',
    'Ready for Review': 'Review',
    'Submitted to DICRI': 'View Package',
    'Screening in Progress': 'View Status',
    'Response Issued': 'View Response',
  };
  return labels[status] || 'View Package';
}

function applicationControlledActions(status) {
  if (status === 'Needs Clarification') return ['Update Application', 'Request Clarification', 'Download Summary', 'View Audit Trail'];
  if (status === 'Ready for Review') return ['Update Application', 'Submit to DICRI', 'View Corridor Screening', 'Download Summary', 'View Audit Trail'];
  if (status === 'Submitted to DICRI') return ['View Corridor Screening', 'Download Summary', 'View Audit Trail'];
  if (status === 'Screening in Progress') return ['View Corridor Screening', 'Download Summary', 'View Audit Trail'];
  if (status === 'Response Issued') return ['View Response Package', 'Download Summary', 'View Audit Trail'];
  return ['Update Application', 'Download Summary', 'View Audit Trail'];
}

function submittedCompleteness(packet) {
  return packet.sketchFileName ? 100 : 96;
}

function makeAuthForm(agency) {
  const officers = DEPARTMENT_OFFICERS[agency] || DEPARTMENT_OFFICERS[INTAKE_AGENCIES[0]];
  return { agency, officer: officers[0].name, officerId: officers[0].id, password: '', mfa: '' };
}

function marketForAgency(agency) {
  if (agency.includes('Lagos')) return 'Nigeria / Lagos';
  if (agency.includes('Abuja') || agency.includes('NCC')) return 'Nigeria / FCT';
  if (agency.includes('National Fiber')) return 'Nigeria / Kano';
  return 'Nigeria / Rivers';
}

function withWorkflowCompleteness(packet, mode, step) {
  if (mode !== 'intake') return packet;
  const completeness = packet.status === 'Submitted to DICRI' || step === 10 || step >= 8 ? submittedCompleteness(packet) : STEP_COMPLETENESS[step] || packet.completeness;
  const status = step === 10 ? 'Submitted to DICRI' : packet.status;
  return { ...packet, completeness, status };
}

function scoreCompleteness(packet, eligibility) {
  let score = STEP_COMPLETENESS[3];
  if (eligibility.ground === 'No') score -= 15;
  if (eligibility.depthKnown === 'No') score -= 8;
  if (eligibility.ownersNotified === 'No') score -= 8;
  if (eligibility.row === 'Unsure') score -= 5;
  if (eligibility.ground === 'Yes' && eligibility.depthKnown === 'Yes') score += 4;
  return Math.max(20, Math.min(STEP_COMPLETENESS[8], score));
}

function classificationHint(classification) {
  const hints = {
    'Drainage Construction': 'Culvert, drainage, trenching, ditch works',
    'Road Rehabilitation': 'Road cut, milling, resurfacing, pavement works',
    'Utility Duct Installation': 'Conduit or protected utility corridor works',
    'Foundation / Piling': 'Ground penetrating support or piling works',
    'Fiber Deployment': 'Telecom route, duct, access chamber activity',
    'Water / Sewer Works': 'Waterline, sewer, outfall, chamber activity',
    'Power Works': 'Feeder, service, underground power activity',
  };
  return hints[classification];
}
