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
      label: 'github URL',
    },
    {
      name: 'liveurl',
      type: 'text',
      label: 'Live URL',
    },
    {
      // this field was added because i somehow got an error that said wrong email field while no email field existed
      name: 'email',
      type: 'text', // it does not have to be an email it can be random text
      label: 'Contact Email',
      // defaultValue is now a function that returns a short random string
      defaultValue: () => `random-${Math.random().toString(36).slice(2, 10)}`,
      required: true,
    },
  ],
}
