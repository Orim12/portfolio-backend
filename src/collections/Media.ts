import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      label: 'Cloudinary URL',
      admin: {
        readOnly: true,
        hidden: true, // Verberg in admin, we genereren dit automatisch
      },
    },
  ],
  hooks: {
    afterRead: [
      ({ doc }) => {
        // Genereer cloudinaryUrl automatisch
        if (doc.filename) {
          const publicId = doc.filename.startsWith('media/')
            ? doc.filename
            : `media/${doc.filename}`
          doc.cloudinaryUrl = `https://res.cloudinary.com/dqbctfrbn/image/upload/${publicId}`
        }
        return doc
      },
    ],
  },
  upload: true,
}
