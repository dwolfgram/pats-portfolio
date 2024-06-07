import path from 'path'
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { es } from 'payload/i18n/es'
import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  HeadingFeature,
  IndentFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
//import { slateEditor } from '@payloadcms/richtext-slate'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload/config'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const adapter = s3Adapter({
  config: {
    // endpoint: 'https://s3.amazonaws.com',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    region: process.env.S3_REGION,
    // ... Other S3 configuration
  },
  bucket: process.env.S3_BUCKET!,
})

export default buildConfig({
  //editor: slateEditor({}),
  plugins: [
    cloudStorage({
      // enabled: process.env.NODE_ENV === 'development',
      collections: {
        media: {
          adapter,
        },
      },
    }),
  ],
  editor: lexicalEditor(),
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        hidden: true,
      },
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [],
    },
    {
      slug: 'projects',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'urlSlug',
          type: 'text',
          admin: {
            placeholder: 'my-url-slug',
          },
          required: true,
        },
        {
          name: 'featuredImage',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
        {
          name: 'otherImages',
          type: 'array',
          fields: [
            {
              name: 'image',
              label: 'Image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'categories',
          label: 'Categories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
        },
        {
          name: 'toolsUsed',
          label: 'Tools Used',
          type: 'relationship',
          relationTo: 'tools',
          hasMany: true,
        },
        {
          name: 'projectDescription',
          type: 'textarea',
        },
      ],
    },
    {
      slug: 'categories',
      access: {
        read: () => true,
      },
      admin: {
        useAsTitle: 'categoryName',
      },
      fields: [
        {
          name: 'categoryName',
          type: 'text',
        },
      ],
    },
    {
      slug: 'tools',
      access: {
        read: () => true,
      },
      admin: {
        useAsTitle: 'toolName',
      },
      fields: [
        {
          name: 'toolName',
          type: 'text',
        },
      ],
    },
    {
      slug: 'aboutPageData',
      access: {
        read: () => true,
      },
      admin: {
        useAsTitle: 'fieldName',
      },
      fields: [
        {
          name: 'fieldName',
          type: 'text',
        },
        {
          name: 'aboutText',
          type: 'textarea',
        },
      ],
    },
    {
      slug: 'media',
      upload: true,
      access: {
        read: () => true,
      },
      admin: {
        useAsTitle: 'imageDescription',
      },
      fields: [
        {
          name: 'imageDescription',
          type: 'text',
        },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.POSTGRES_URI || '',
  //   },
  // }),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),

  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { es },
  },

  admin: {
    autoLogin: {
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
      prefillOnly: true,
    },
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: process.env.ADMIN_EMAIL!,
          password: process.env.ADMIN_PASSWORD!,
        },
      })
    }
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
})
