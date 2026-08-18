import { withBasePath } from '../lib/base-path'

export type HomeService = {
  title: string
  description: string
  image: string
  imageAlt: string
}

export type Designer = {
  name: string
  role: string
  image: string
}

// Phase-one homepage content remains explicit React data so WordPress can replace it through a deliberate API mapper later.
export const homeServices: HomeService[] = [
  {
    title: 'Kitchens',
    description: 'Reimagine the heart of your home with one of our designers. Whether you are remodeling or building new, we craft an innovative and lasting design for your style and space.',
    image: withBasePath('/assets/home/service-kitchen.jpg'),
    imageAlt: 'Bright custom kitchen with a large island and upholstered stools',
  },
  {
    title: 'Bathrooms',
    description: 'Create a luxurious experience that enhances body and spirit. Thoughtful planning, tailored storage, and enduring materials turn an everyday room into a peaceful sanctuary.',
    image: withBasePath('/assets/home/service-bathroom.jpg'),
    imageAlt: 'Calm bathroom remodel with a glass shower and custom vanity',
  },
  {
    title: 'Living Spaces & Beyond',
    description: 'From laundry rooms and home offices to additions and custom cabinetry, our designers make every inch work beautifully and purposefully for the way you live.',
    image: withBasePath('/assets/home/service-living-space.jpg'),
    imageAlt: 'Custom laundry room with built-in cabinetry and utility sink',
  },
]

export const designers: Designer[] = [
  { name: 'Vonnie Marcyoniak', role: 'President & Lead Designer', image: withBasePath('/assets/home/designer-vonnie.png') },
  { name: 'Callie Rapa', role: 'Senior Designer', image: withBasePath('/assets/home/designer-callie.png') },
  { name: 'Liz Lemire', role: 'Office Coordinator', image: withBasePath('/assets/home/designer-liz.png') },
]
