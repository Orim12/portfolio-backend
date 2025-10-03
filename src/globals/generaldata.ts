import { GlobalConfig } from 'payload'

export const GeneralData: GlobalConfig = {
  slug: 'general-data',
  label: 'General Data',
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
