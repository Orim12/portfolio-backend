import { GlobalConfig } from 'payload'

export const GeneralData: GlobalConfig = {
  slug: 'general-data',
  label: 'General Data',
  access: {
    read: () => true,
  },
  fields: [
    {
        name: 'projectsAantal',
        type: 'number',
        label: 'Aantal projecten',
        required: true,
    },
    {
        name: 'ervaringJaren',
        type: 'number',
        label: 'Jaren ervaring',
        required: true,
    },
    {
        name: 'klantenAantal',
        type: 'number',}
  ],
}
