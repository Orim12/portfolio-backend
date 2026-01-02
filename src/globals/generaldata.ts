import { GlobalConfig } from 'payload'

export const GeneralData: GlobalConfig = {
  slug: 'general-data',
  label: 'General Data',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'cv',
      type: 'upload',
      label: 'cv',
      relationTo: 'media',
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
      type: 'number',
    },
  ],
}
