import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'Projects',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'naam',
      type: 'text',
      required: true,
      label: 'Project Naam',
    },
    {
      name: 'beschrijving',
      type: 'textarea',
      label: 'Beschrijving',
    },
    {
      name: 'afbeelding',
      type: 'upload',
      relationTo: 'media',
      label: 'Project Afbeelding',
    },
    {
      name: 'technologieen',
      type: 'array',
      label: 'Technologieën',
      fields: [
        {
          name: 'technologie',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      label: 'Project URL',
    },
  ],
}
