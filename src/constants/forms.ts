import { CascaderOption, SelectOption } from "@interfaces/form";

export const LocationCascader: CascaderOption[] = [
  {
    value: "eastern",
    label: "Eastern Region",
    children: [
      {
        value: "Kailahun",
        label: "Kailahun District",
      },
      {
        value: "Kenema",
        label: "Kenema District",
      },
      {
        value: "Kono",
        label: "Kono District",
      },
    ],
  },
  {
    value: "southern",
    label: "Southern Region",
    children: [
      {
        value: "Bo",
        label: "Bo District",
      },
      {
        value: "Pujehun",
        label: "Pujehun District",
      },
      {
        value: "Moyamba",
        label: "Moyamba District",
      },
      {
        value: "Bonthe",
        label: "Bonthe District",
      },
    ],
  },
  {
    value: "northern",
    label: "Northern Region",
    children: [
      {
        value: "Bombali",
        label: "Bombali District",
      },
      {
        value: "Falaba",
        label: "Falaba District",
      },
      {
        value: "Koinadugu",
        label: "Koinadugu District",
      },
      {
        value: "Tonkolili",
        label: "Tonkolili District",
      },
    ],
  },
  {
    value: 'north-western',
    label: 'North Western Region',
    children: [
        {
            value: 'Kambia',
            label: 'Kambia District'
        },
        {
            value: 'Karene',
            label: 'Karene District'
        },
        {
            value: 'PortLoko',
            label: 'Port Loko District'
        }
    ]
  },
  {
    value: 'western-urban',
    label: 'Western Urban Region'
  },
  {
    value: 'western-rural',
    label: 'Western Rural Region'
  }
];

export const DigitalLiteracyLevelOption: SelectOption[] = [
  {
    value: "1",
    label: 'Very Low'
  },
  {
    value: "2",
    label: 'Low'
  },
  {
    value: "3",
    label: 'Average'
  },
  {
    value: "4",
    label: 'High'
  },
  {
    value: "5",
    label: 'Very High'
  },
]

export const FundingCapOption: SelectOption[] = [
  {
    value: "small",
    label: "Small"
  },
  {
    value: 'mid',
    label: "Mid"
  },
  {
    value: 'large',
    label: 'Large'
  }
]

export const RegionPreferenceOptions: SelectOption[] = [
  {
    value: 'eastern',
    label: 'Eastern'
  },
  {
    value: 'southern',
    label: 'Southern'
  },
  {
    value: 'northern',
    label: 'Northern'
  },
  {
    value: 'north-western',
    label:'North Western'
  },
  {
    value: 'western-urban',
    label: 'Western Urban'
  },
  {
    value: 'western-rural',
    label: 'Western Rural'
  }
]

export const SectorFocusOptions: SelectOption[] = [
  {
    value: 'research',
    label: 'Research'
  },
  {
    value: 'policy',
    label:'Policy'
  }
]

export const AreaOfInterestOptions: SelectOption[] = [
  {
    value: 'crop',
    label: 'Crop',
  },
  {
    value: 'technology',
    label: 'Technology',
  }
]