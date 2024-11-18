import { ResourceProps } from '@refinedev/core'

import { CROPS_COLLECTION_ID, EVENTS_COLLECTION_ID, FARMERS_COLLECTION_ID, FUNDING_PROJECTS_COLLECTION_ID, FUNDING_REPORTS_COLLECTION_ID, INVENTORIES_COLLECTION_ID, INVESTORS_COLLECTION_ID, LOCATIONS_COLLECTION_ID, ORDERS_COLLECTION_ID, PRODUCTS_COLLECTION_ID, RESEARCH_ARCHIVES_COLLECTION_ID, STAKEHOLDERS_COLLECTION_ID, TRANSACTIONS_COLLECTION_ID } from "./appWrite";
import { AuditOutlined, CalendarOutlined, DashboardOutlined, DatabaseOutlined, DollarCircleOutlined, FundProjectionScreenOutlined, FundViewOutlined, SettingOutlined, ShopOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

export const refineResources: ResourceProps[] = [
  {
    name: 'dashboard',
    list: '/dashboard',
    meta: {
      label: 'dashboard',
      icon: <DashboardOutlined />
    },
  },
  {
    name: 'accounts',
    meta: {
      label: 'accounts',
      icon: <TeamOutlined />
    }
  },
  {
    name: 'accounts_overview',
    list: '/dashboard/accounts',
    meta: {
      label: 'overview',
      parent:'accounts'
    }
  },
  {
    name: FARMERS_COLLECTION_ID!,
    list: "/dashboard/accounts/farmers",
    create: "/dashboard/accounts/farmers/create",
    edit: "/dashboard/accounts/farmers/edit/:id",
    show: "/dashboard/accounts/farmers/show/:id",
    meta: {
      label: "farmers",
      parent: "accounts"
    },
  },
  {
    name: INVESTORS_COLLECTION_ID!,
    list: "/dashboard/accounts/investors",
    meta: {
      label: "investors",
      parent: "accounts"
    },
  },
  {
    name: STAKEHOLDERS_COLLECTION_ID!,
    list: "/dashboard/accounts/stakeholders",
    meta: {
      label: "stakeholders",
      parent: "accounts"
    },
  },
  {
    name: 'registry',
    meta: {
      label: 'registry',
      icon: <DatabaseOutlined />
    }
  },
  {
    name: 'registry_overview',
    list: '/dashboard/registry',
    meta: {
      label: 'overview',
      parent: 'registry'
    }
  },
  {
    name: CROPS_COLLECTION_ID!,
    list: "/dashboard/registry/crops",
    meta: {
      label: "crops",
      parent: "registry"
    },
  },
  {
    name: RESEARCH_ARCHIVES_COLLECTION_ID!,
    list: "/dashboard/registry/researches",
    meta: {
      label: "researches",
      parent: "registry"
    },
  },
  {
    name: 'marketplace',
    meta: {
      label:'marketplace',
      icon: <ShopOutlined />
    }
  },
  {
    name: 'marketplace_overview',
    meta: {
      label: 'overview',
      parent: 'marketplace'
    }
  },
  {
    name: PRODUCTS_COLLECTION_ID!,
    list: 'dashboard/marketplace/products',
    meta: {
      label: 'products',
      parent: 'marketplace'
    }
  },
  {
    name: ORDERS_COLLECTION_ID!,
    list: '/dashboard/marketplace/orders',
    meta: {
      label: 'orders',
      parent: 'marketplace'
    }
  },
  {
    name: TRANSACTIONS_COLLECTION_ID!,
    list: '/dashboard/marketplace/transactions',
    meta: {
      label: 'transactions',
      parent: 'marketplace'
    }
  },
  {
    name: INVENTORIES_COLLECTION_ID!,
    list: '/dashboard/marketplace/inventories',
    meta: {
      label: 'inventories',
      parent: 'marketplace'
    }
  },
  {
    name: 'fundings',
    meta: {
      label: 'fundings',
      icon: <FundViewOutlined />
    }
  },
  {
    name: 'funding_overview',
    list: '/dashboard/fundings',
    meta: {
      label: 'overview',
      parent: 'fundings'
    }
  },
  {
    name: FUNDING_PROJECTS_COLLECTION_ID!,
    list: "/dashboard/fundings/projects",
    meta: {
      label: "projects",
      parent: "fundings",
    },
  },
  {
    name: FUNDING_REPORTS_COLLECTION_ID!,
    list: "/dashboard/funding/reports",
    meta: {
      label: "reports",
      parent: "fundings",
    },
  },
  {
    name: 'events',
    meta: {
      label: 'calendar',
      icons: <CalendarOutlined />
    }
  },
  {
    name: 'events_overview',
    list: 'dashboard/calendar',
    meta: {
      label: 'overview',
      parent: 'events'
    }
  },
  {
    name: EVENTS_COLLECTION_ID!,
    list: '/dashboard/calendar/events',
    meta: {
      label: 'calendar',
      parent: 'events'
    }
  },
  {
    name: 'profile',
    list: '/dashboard/profile',
    meta: {
      label: 'account setting',
      icon: <SettingOutlined />
    }
  }
 
]