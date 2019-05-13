// extremely dumb/slow function just for demo
export function getPhysicianName(id) {
  for (let i = 0; i < physicians.length; i++) {
    const phys = physicians[i];
    if (phys.id === id) return phys.fullName;
  }

  return `Dr. Unknown (ID ${id})`;
}

const physicians = [
  {
    id: 28716,
    modelClass: 'User',
    staffId: 9433133744130,
    staffType: 'Physician',
    firstName: 'Anne',
    lastName: 'Testing',
    fullName: 'Anne Testing, .',
    email: 'anne+newappphysician@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: false,
    isElationStaff: false,
    name: 'Anne Testing, .'
  },
  {
    id: 57394,
    modelClass: 'User',
    staffId: 22582807035906,
    staffType: 'Physician',
    firstName: 'Arjun',
    lastName: 'Test',
    fullName: 'Arjun Test, dr',
    email: 'arjun+test@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: false,
    isElationStaff: false,
    name: 'Arjun Test, dr'
  },
  {
    id: 25454,
    modelClass: 'User',
    staffId: 8701956390914,
    staffType: 'Physician',
    firstName: 'Conan',
    lastName: 'Demo1',
    fullName: 'Conan Demo1, MD',
    email: 'conan.fong+test1@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: true,
    isElationStaff: false,
    name: 'Conan Demo1, MD'
  },
  {
    id: 235,
    modelClass: 'User',
    staffId: 609558003714,
    staffType: 'Physician',
    firstName: 'Demo',
    lastName: 'Doctor',
    fullName: 'Demo Doctor, MD',
    email: 'demodoctor@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: true,
    isElationStaff: false,
    name: 'Demo Doctor, MD'
  },
  {
    id: 5669,
    modelClass: 'User',
    staffId: 2915976347650,
    staffType: 'Physician',
    firstName: 'Elation',
    lastName: 'DemoDoctor10',
    fullName: 'Elation DemoDoctor10, MD',
    email: 'zak@hint.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: false,
    isElationStaff: false,
    name: 'Elation DemoDoctor10, MD'
  },
  {
    id: 353,
    modelClass: 'User',
    staffId: 832676429826,
    staffType: 'Physician',
    firstName: 'Elation',
    lastName: 'DemoDoctor3',
    fullName: 'Elation DemoDoctor3, MD',
    email: 'demodoctor3@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: false,
    isElationStaff: false,
    name: 'Elation DemoDoctor3, MD'
  },
  {
    id: 3253,
    modelClass: 'User',
    staffId: 2055155023874,
    staffType: 'Physician',
    firstName: 'Elation',
    lastName: 'DemoDoctor4',
    fullName: 'Elation DemoDoctor4, MD',
    email: 'demodoctor4@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: true,
    isElationStaff: false,
    name: 'Elation DemoDoctor4, MD'
  },
  {
    id: 5671,
    modelClass: 'User',
    staffId: 2916019798018,
    staffType: 'Physician',
    firstName: 'Elation',
    lastName: 'DemoDoctor5',
    fullName: 'Elation DemoDoctor5, MD',
    email: 'bob@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: true,
    isElationStaff: false,
    name: 'Elation DemoDoctor5, MD'
  },
  {
    id: 5670,
    modelClass: 'User',
    staffId: 2916019077122,
    staffType: 'Physician',
    firstName: 'Elation',
    lastName: 'DemoDoctor6',
    fullName: 'Elation DemoDoctor6, MD',
    email: 'demodoctor6@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: false,
    isElationStaff: false,
    name: 'Elation DemoDoctor6, MD'
  },
  {
    id: 5666,
    modelClass: 'User',
    staffId: 2915954196482,
    staffType: 'Physician',
    firstName: 'Elation',
    lastName: 'DemoDoctor7',
    fullName: 'Elation DemoDoctor7, MD',
    email: 'demodoctor7@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: false,
    isElationStaff: false,
    name: 'Elation DemoDoctor7, MD'
  },
  {
    id: 5668,
    modelClass: 'User',
    staffId: 2915970449410,
    staffType: 'Physician',
    firstName: 'Elation',
    lastName: 'DemoDoctor9',
    fullName: 'Elation DemoDoctor9, MD',
    email: 'demodoctor9@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: true,
    isElationStaff: false,
    name: 'Elation DemoDoctor9, MD'
  },
  {
    id: 103068,
    modelClass: 'User',
    staffId: 39910505906178,
    staffType: 'Physician',
    firstName: 'Ellen',
    lastName: 'Testing',
    fullName: 'Ellen Testing, MD',
    email: 'ellen+testing@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: false,
    isElationStaff: false,
    name: 'Ellen Testing, MD'
  },
  {
    id: 352,
    modelClass: 'User',
    staffId: 832673546242,
    staffType: 'Physician',
    firstName: 'EVCARRIE',
    lastName: 'CONSUMER',
    fullName: 'EVCARRIE CONSUMER, MD',
    email: 'demodoctor2@elationemr.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: true,
    isElationStaff: false,
    name: 'EVCARRIE CONSUMER, MD'
  },
  {
    id: 110644,
    modelClass: 'User',
    staffId: 43085514801154,
    staffType: 'Physician',
    firstName: 'Savannah',
    lastName: 'Demo',
    fullName: 'Savannah Demo, MD',
    email: 'savannah.whitington+qa@elationhealth.com',
    directAddress: '',
    isActive: true,
    isRegistered: true,
    isAdmin: true,
    isElationStaff: false,
    name: 'Savannah Demo, MD'
  }
];

export default physicians;