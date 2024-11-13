import { ResourceProps } from '@refinedev/core'

import { CROPS_COLLECTION_ID, FARMERS_COLLECTION_ID, FUNDING_PROJECTS_COLLECTION_ID, FUNDING_REPORTS_COLLECTION_ID, INVESTORS_COLLECTION_ID, LOCATIONS_COLLECTION_ID, RESEARCH_ARCHIVES_COLLECTION_ID, STAKEHOLDERS_COLLECTION_ID } from "./appWrite";
import { AuditOutlined, DashboardOutlined, DatabaseOutlined, DollarCircleOutlined, FundProjectionScreenOutlined, FundViewOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

export const refineResources: ResourceProps[] = [
  {
    name: 'dashboard',
    list: '/dashboard',
    meta: {
      label: 'dashboard',
      icon: <DashboardOutlined />
    }
  },
  {
    name: 'accounts',
    meta: {
      label: 'accounts',
      icon: <TeamOutlined />
    }
  },
  {
    name: FARMERS_COLLECTION_ID!,
    list: "/dashboard/farmers",
    create: "/dashboard/farmers/create",
    edit: "/dashboard/farmers/edit/:id",
    show: "/dashboard/farmers/show/:id",
    meta: {
      canDelete: true,
      label: "farmers",
      parent: "accounts"
    },
  },
  {
    name: LOCATIONS_COLLECTION_ID!,
    list: "/dashboard/locations",
    meta: {
      canDelete: true,
      label: "locations",
      parent: "accounts"
    },
  },
  {
    name: INVESTORS_COLLECTION_ID!,
    list: "/dashboard/investors",
    meta: {
      canDelete: true,
      label: "investors",
      parent: "accounts"
    },
  },
  {
    name: STAKEHOLDERS_COLLECTION_ID!,
    list: "/dashboard/stakeholders",
    meta: {
      canDelete: true,
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
    name: CROPS_COLLECTION_ID!,
    list: "/dashboard/crops",
    meta: {
      canDelete: true,
      label: "crops",
      parent: "registry"
    },
  },
  {
    name: RESEARCH_ARCHIVES_COLLECTION_ID!,
    list: "/dashboard/researches",
    meta: {
      canDelete: true,
      label: "researches",
      parent: "registry"
    },
  },
  {
    name: 'fundings',
    meta: {
      label: 'fundings',
      icon: <FundViewOutlined />
    }
  },
  {
    name: FUNDING_PROJECTS_COLLECTION_ID!,
    list: "/dashboard/projects",
    meta: {
      canDelete: true,
      label: "projects",
      parent: "fundings",
    },
  },
  {
    name: FUNDING_REPORTS_COLLECTION_ID!,
    list: "/dashboard/reports",
    meta: {
      canDelete: true,
      label: "reports",
      parent: "fundings",
    },
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