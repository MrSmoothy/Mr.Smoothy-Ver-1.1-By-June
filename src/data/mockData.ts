import { Menu, Ingredient, Packaging, Straw } from '../types';

export const mockMenus: Menu[] = [
  // Signature
  {
    id: '1',
    category: 'Signature',
    name: 'Ocean Glow',
    description: 'Refreshing sea moss blend with tropical notes',
    price: 12.99,
    image: '/images/ocean-glow.jpg',
    ingredients: ['sea moss', 'banana', 'almond milk', 'collagen peptide', 'date syrup'],
    tags: ['high protein', 'low sugar']
  },
  {
    id: '2',
    category: 'Signature',
    name: 'Blue Spirit',
    description: 'Vibrant blue spirulina with pineapple boost',
    price: 11.99,
    image: '/images/blue-spirit.jpg',
    ingredients: ['blue spirulina', 'coconut water', 'pineapple', 'banana', 'chia seed'],
    tags: ['antioxidant', 'energy']
  },
  {
    id: '3',
    category: 'Signature',
    name: 'Golden Vitality',
    description: 'Anti-inflammatory turmeric mango blend',
    price: 12.49,
    image: '/images/golden-vitality.jpg',
    ingredients: ['turmeric', 'mango', 'coconut yogurt', 'honey', 'oat milk'],
    tags: ['anti-inflammatory', 'vitamin c']
  },
  {
    id: '4',
    category: 'Signature',
    name: 'Cosmic Green',
    description: 'Earthy matcha with sea moss nutrition',
    price: 13.99,
    image: '/images/cosmic-green.jpg',
    ingredients: ['matcha', 'sea moss', 'spinach', 'almond milk', 'agave'],
    tags: ['energy', 'antioxidant']
  },
  
  // Classic
  {
    id: '5',
    category: 'Classic',
    name: 'Berry Bliss',
    description: 'Classic mixed berry smoothie',
    price: 9.99,
    image: '/images/berry-bliss.jpg',
    ingredients: ['strawberry', 'blueberry', 'banana', 'yogurt', 'honey'],
    tags: ['classic', 'antioxidant']
  },
  {
    id: '6',
    category: 'Classic',
    name: 'Mango Tango',
    description: 'Tropical mango pineapple delight',
    price: 10.49,
    image: '/images/mango-tango.jpg',
    ingredients: ['mango', 'pineapple', 'yogurt', 'orange juice'],
    tags: ['tropical', 'vitamin c']
  },
  {
    id: '7',
    category: 'Classic',
    name: 'Choco Banana Dream',
    description: 'Rich chocolate banana smoothie',
    price: 10.99,
    image: '/images/choco-banana.jpg',
    ingredients: ['banana', 'cocoa powder', 'almond milk', 'chia seeds'],
    tags: ['protein', 'energy']
  },
  {
    id: '8',
    category: 'Classic',
    name: 'Peachy Yogurt',
    description: 'Creamy peach banana yogurt blend',
    price: 9.49,
    image: '/images/peachy-yogurt.jpg',
    ingredients: ['peach', 'banana', 'yogurt', 'oat milk'],
    tags: ['creamy', 'classic']
  },
  
  // Green Booster
  {
    id: '9',
    category: 'Green Booster',
    name: 'Detox Garden',
    description: 'Cleansing green vegetable blend',
    price: 11.49,
    image: '/images/detox-garden.jpg',
    ingredients: ['spinach', 'celery', 'cucumber', 'apple', 'lemon', 'ginger'],
    tags: ['detox', '0% sugar']
  },
  {
    id: '10',
    category: 'Green Booster',
    name: 'Matcha Mint Cooler',
    description: 'Refreshing matcha with mint',
    price: 12.99,
    image: '/images/matcha-mint.jpg',
    ingredients: ['matcha', 'mint', 'coconut water', 'spinach'],
    tags: ['energy', 'low sugar']
  },
  {
    id: '11',
    category: 'Green Booster',
    name: 'Avocado Glow',
    description: 'Creamy avocado green smoothie',
    price: 11.99,
    image: '/images/avocado-glow.jpg',
    ingredients: ['avocado', 'kale', 'banana', 'oat milk', 'honey'],
    tags: ['healthy fats', 'creamy']
  },
  {
    id: '12',
    category: 'Green Booster',
    name: 'Green Energy Shot',
    description: 'Potent wheatgrass energy boost',
    price: 10.99,
    image: '/images/green-energy.jpg',
    ingredients: ['wheatgrass', 'cucumber', 'lime', 'pineapple'],
    tags: ['energy', 'detox']
  },
  
  // High-Protein
  {
    id: '13',
    category: 'High-Protein Smoothies',
    name: 'Muscle Monkey',
    description: 'High protein banana workout fuel',
    price: 13.99,
    image: '/images/muscle-monkey.jpg',
    ingredients: ['banana', 'whey protein', 'oat milk', 'almond butter'],
    tags: ['high protein', 'workout']
  },
  {
    id: '14',
    category: 'High-Protein Smoothies',
    name: 'Power Berry Shake',
    description: 'Plant protein berry power shake',
    price: 14.49,
    image: '/images/power-berry.jpg',
    ingredients: ['blueberry', 'plant protein', 'oat milk', 'flaxseed'],
    tags: ['high protein', 'plant-based']
  },
  {
    id: '15',
    category: 'High-Protein Smoothies',
    name: 'Coffee Charge',
    description: 'Coffee protein energy boost',
    price: 12.99,
    image: '/images/coffee-charge.jpg',
    ingredients: ['cold brew coffee', 'protein powder', 'banana', 'almond milk'],
    tags: ['high protein', 'caffeine']
  },
  {
    id: '16',
    category: 'High-Protein Smoothies',
    name: 'Nutty Builder',
    description: 'Peanut butter protein builder',
    price: 13.49,
    image: '/images/nutty-builder.jpg',
    ingredients: ['peanut butter', 'banana', 'whey', 'soy milk'],
    tags: ['high protein', 'energy']
  },
  
  // Superfruits
  {
    id: '17',
    category: 'Superfruits',
    name: 'Acai Power Bowl',
    description: 'Antioxidant-rich acai bowl',
    price: 14.99,
    image: '/images/acai-bowl.jpg',
    ingredients: ['acai puree', 'banana', 'strawberry', 'granola'],
    tags: ['antioxidant', 'superfruit']
  },
  {
    id: '18',
    category: 'Superfruits',
    name: 'Dragon Energy',
    description: 'Exotic dragon fruit energy blend',
    price: 13.99,
    image: '/images/dragon-energy.jpg',
    ingredients: ['dragon fruit', 'pineapple', 'passion fruit', 'coconut water'],
    tags: ['exotic', 'energy']
  },
  {
    id: '19',
    category: 'Superfruits',
    name: 'Tropical Boost',
    description: 'Tropical superfruit explosion',
    price: 12.99,
    image: '/images/tropical-boost.jpg',
    ingredients: ['mango', 'banana', 'kiwi', 'passion fruit', 'oat milk'],
    tags: ['tropical', 'vitamin c']
  },
  {
    id: '20',
    category: 'Superfruits',
    name: 'Sunrise Punch',
    description: 'Vibrant orange carrot sunrise',
    price: 11.99,
    image: '/images/sunrise-punch.jpg',
    ingredients: ['orange', 'carrot', 'pineapple', 'ginger'],
    tags: ['vitamin a', 'immune boost']
  }
];

export const mockIngredients: Ingredient[] = [
  // Organic Fruits
  { id: 'f1', name: 'banana', category: 'Organic Fruits', kcal: 89, protein_g: 1.1, sugar_g: 12.2, icon: '🍌' },
  { id: 'f2', name: 'mango', category: 'Organic Fruits', kcal: 60, protein_g: 0.8, sugar_g: 13.7, icon: '🥭' },
  { id: 'f3', name: 'strawberry', category: 'Organic Fruits', kcal: 32, protein_g: 0.7, sugar_g: 4.9, icon: '🍓' },
  { id: 'f4', name: 'blueberry', category: 'Organic Fruits', kcal: 57, protein_g: 0.7, sugar_g: 10.0, icon: '🫐' },
  { id: 'f5', name: 'pineapple', category: 'Organic Fruits', kcal: 50, protein_g: 0.5, sugar_g: 9.9, icon: '🍍' },
  { id: 'f6', name: 'apple', category: 'Organic Fruits', kcal: 52, protein_g: 0.3, sugar_g: 10.4, icon: '🍎' },
  { id: 'f7', name: 'passion fruit', category: 'Organic Fruits', kcal: 97, protein_g: 2.2, sugar_g: 11.2, icon: '🍈' },
  { id: 'f8', name: 'kiwi', category: 'Organic Fruits', kcal: 61, protein_g: 1.1, sugar_g: 9.0, icon: '🥝' },
  { id: 'f9', name: 'dragon fruit', category: 'Organic Fruits', kcal: 60, protein_g: 1.2, sugar_g: 8.0, icon: '🐉' },
  { id: 'f10', name: 'peach', category: 'Organic Fruits', kcal: 39, protein_g: 0.9, sugar_g: 8.4, icon: '🍑' },
  { id: 'f11', name: 'orange', category: 'Organic Fruits', kcal: 47, protein_g: 0.9, sugar_g: 9.4, icon: '🍊' },
  { id: 'f12', name: 'carrot', category: 'Organic Fruits', kcal: 41, protein_g: 0.9, sugar_g: 4.7, icon: '🥕' },
  
  // Organic Vegetables
  { id: 'v1', name: 'spinach', category: 'Organic Vegetables', kcal: 23, protein_g: 2.9, sugar_g: 0.4, icon: '🥬' },
  { id: 'v2', name: 'kale', category: 'Organic Vegetables', kcal: 49, protein_g: 4.3, sugar_g: 0.8, icon: '🥬' },
  { id: 'v3', name: 'celery', category: 'Organic Vegetables', kcal: 14, protein_g: 0.7, sugar_g: 1.4, icon: '🥬' },
  { id: 'v4', name: 'cucumber', category: 'Organic Vegetables', kcal: 16, protein_g: 0.7, sugar_g: 1.7, icon: '🥒' },
  { id: 'v5', name: 'mint', category: 'Organic Vegetables', kcal: 0, protein_g: 0.0, sugar_g: 0.0, icon: '🌿' },
  { id: 'v6', name: 'ginger', category: 'Organic Vegetables', kcal: 80, protein_g: 1.8, sugar_g: 1.7, icon: '🫚' },
  { id: 'v7', name: 'wheatgrass', category: 'Organic Vegetables', kcal: 0, protein_g: 0.0, sugar_g: 0.0, icon: '🌱' },
  
  // Superfoods
  { id: 's1', name: 'sea moss', category: 'Superfoods', kcal: 49, protein_g: 2.1, sugar_g: 0.0, icon: '🌊' },
  { id: 's2', name: 'spirulina', category: 'Superfoods', kcal: 290, protein_g: 57.5, sugar_g: 0.0, icon: '🌀' },
  { id: 's3', name: 'turmeric', category: 'Superfoods', kcal: 354, protein_g: 7.8, sugar_g: 3.2, icon: '🟡' },
  { id: 's4', name: 'matcha', category: 'Superfoods', kcal: 0, protein_g: 0.0, sugar_g: 0.0, icon: '🍵' },
  { id: 's5', name: 'maca powder', category: 'Superfoods', kcal: 310, protein_g: 11.5, sugar_g: 46.8, icon: '🟤' },
  { id: 's6', name: 'flaxseed', category: 'Superfoods', kcal: 534, protein_g: 18.3, sugar_g: 1.6, icon: '🌾' },
  { id: 's7', name: 'chia seed', category: 'Superfoods', kcal: 486, protein_g: 16.5, sugar_g: 0.0, icon: '🌰' },
  { id: 's8', name: 'collagen peptide', category: 'Superfoods', kcal: 0, protein_g: 12.0, sugar_g: 0.0, icon: '💪' },
  { id: 's9', name: 'acai puree', category: 'Superfoods', kcal: 70, protein_g: 1.0, sugar_g: 2.0, icon: '🟣' },
  
  // Protein
  { id: 'p1', name: 'whey protein', category: 'Protein', kcal: 120, protein_g: 25.0, sugar_g: 2.0, icon: '🥛' },
  { id: 'p2', name: 'plant protein', category: 'Protein', kcal: 110, protein_g: 22.0, sugar_g: 1.0, icon: '🌱' },
  { id: 'p3', name: 'collagen protein', category: 'Protein', kcal: 40, protein_g: 10.0, sugar_g: 0.0, icon: '💊' },
  { id: 'p4', name: 'peanut butter', category: 'Protein', kcal: 588, protein_g: 25.0, sugar_g: 12.0, icon: '🥜' },
  { id: 'p5', name: 'almond butter', category: 'Protein', kcal: 614, protein_g: 21.0, sugar_g: 6.0, icon: '🌰' },
  
  // Base
  { id: 'b1', name: 'almond milk', category: 'Base', kcal: 15, protein_g: 0.6, sugar_g: 0.0, icon: '🥛' },
  { id: 'b2', name: 'oat milk', category: 'Base', kcal: 120, protein_g: 3.0, sugar_g: 7.0, icon: '🥛' },
  { id: 'b3', name: 'coconut water', category: 'Base', kcal: 46, protein_g: 0.7, sugar_g: 6.3, icon: '🥥' },
  { id: 'b4', name: 'coconut yogurt', category: 'Base', kcal: 99, protein_g: 5.0, sugar_g: 10.0, icon: '🥥' },
  { id: 'b5', name: 'soy milk', category: 'Base', kcal: 54, protein_g: 3.3, sugar_g: 3.9, icon: '🥛' },
  { id: 'b6', name: 'greek yogurt', category: 'Base', kcal: 100, protein_g: 17.0, sugar_g: 6.0, icon: '🥛' },
  
  // Topping
  { id: 't1', name: 'granola', category: 'Topping', kcal: 489, protein_g: 10.0, sugar_g: 20.0, icon: '🥣' },
  { id: 't2', name: 'almond', category: 'Topping', kcal: 579, protein_g: 21.0, sugar_g: 4.4, icon: '🌰' },
  { id: 't3', name: 'nata de coco', category: 'Topping', kcal: 76, protein_g: 0.0, sugar_g: 20.0, icon: '🧊' },
  { id: 't4', name: 'sunflower seed', category: 'Topping', kcal: 584, protein_g: 20.8, sugar_g: 2.6, icon: '🌻' },
  
  // Sweetener
  { id: 'sw1', name: 'honey', category: 'Sweetener', kcal: 304, protein_g: 0.3, sugar_g: 82.4, icon: '🍯' },
  { id: 'sw2', name: 'agave syrup', category: 'Sweetener', kcal: 310, protein_g: 0.0, sugar_g: 76.0, icon: '🍯' },
  { id: 'sw3', name: 'date syrup', category: 'Sweetener', kcal: 282, protein_g: 0.0, sugar_g: 70.0, icon: '🍯' },
  { id: 'sw4', name: 'coconut sugar', category: 'Sweetener', kcal: 375, protein_g: 0.0, sugar_g: 100.0, icon: '🍚' },
  { id: 'sw5', name: 'maple syrup', category: 'Sweetener', kcal: 260, protein_g: 0.0, sugar_g: 60.0, icon: '🍯' },
  { id: 'sw6', name: 'stevia', category: 'Sweetener', kcal: 0, protein_g: 0.0, sugar_g: 0.0, icon: '🌿' }
];

export const mockPackaging: Packaging[] = [
  // Standard Cup
  { id: 'pkg1', type: 'Standard Cup', size: 'S', price: 0.50, image: '/images/cup-s.jpg' },
  { id: 'pkg2', type: 'Standard Cup', size: 'M', price: 0.75, image: '/images/cup-m.jpg' },
  { id: 'pkg3', type: 'Standard Cup', size: 'L', price: 1.00, image: '/images/cup-l.jpg' },
  
  // Eco Cup
  { id: 'pkg4', type: 'Eco Cup', size: 'S', price: 0.75, image: '/images/eco-cup-s.jpg' },
  { id: 'pkg5', type: 'Eco Cup', size: 'M', price: 1.00, image: '/images/eco-cup-m.jpg' },
  { id: 'pkg6', type: 'Eco Cup', size: 'L', price: 1.25, image: '/images/eco-cup-l.jpg' },
  
  // Glass Bottle
  { id: 'pkg7', type: 'Glass Bottle', size: 'S', price: 2.00, image: '/images/bottle-s.jpg' },
  { id: 'pkg8', type: 'Glass Bottle', size: 'M', price: 2.50, image: '/images/bottle-m.jpg' },
  { id: 'pkg9', type: 'Glass Bottle', size: 'L', price: 3.00, image: '/images/bottle-l.jpg' },
  
  // Tumbler
  { id: 'pkg10', type: 'Tumbler', size: 'M', style: 'Classic', price: 8.00, image: '/images/tumbler-classic.jpg' },
  { id: 'pkg11', type: 'Tumbler', size: 'M', style: 'Mint', price: 8.50, image: '/images/tumbler-mint.jpg' },
  { id: 'pkg12', type: 'Tumbler', size: 'M', style: 'Pink', price: 9.00, image: '/images/tumbler-pink.jpg' },
  { id: 'pkg13', type: 'Tumbler', size: 'M', style: 'Earth Tone', price: 9.50, image: '/images/tumbler-earth.jpg' }
];

export const mockStraws: Straw[] = [
  { id: 'straw1', type: 'Plastic Straw', price: 0.10, image: '/images/plastic-straw.jpg' },
  { id: 'straw2', type: 'Paper Straw', price: 0.25, image: '/images/paper-straw.jpg' }
];