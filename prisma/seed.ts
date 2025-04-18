import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.cartItem.deleteMany({})
  await prisma.cart.deleteMany({})
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.review.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.account.deleteMany({})
  await prisma.session.deleteMany({})
  await prisma.user.deleteMany({})

  // Create users
  const adminPassword = await hash('admin123', 12)
  const userPassword = await hash('user123', 12)

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
    },
  })

  // Create categories
  const tshirts = await prisma.category.create({
    data: {
      name: 'T-shirts',
      slug: 't-shirts',
      description: 'Comfortable and stylish t-shirts for all occasions',
      image: '/images/c-tshirts.jpg',
    },
  })

  const jeans = await prisma.category.create({
    data: {
      name: 'Jeans',
      slug: 'jeans',
      description: 'High-quality denim jeans for men and women',
      image: '/images/c-jeans.jpg',
    },
  })

  const shoes = await prisma.category.create({
    data: {
      name: 'Shoes',
      slug: 'shoes',
      description: 'Trendy and comfortable footwear for every style',
      image: '/images/c-shoes.jpg',
    },
  })

  // Create products
  // T-shirts
  await prisma.product.create({
    data: {
      name: 'Classic White T-Shirt',
      description: 'Essential white t-shirt made from premium cotton',
      price: 29.99,
      images: ['/images/p11-1.jpg', '/images/p11-2.jpg'],
      categoryId: tshirts.id,
      stock: 100,
      sku: 'TSH-001',
    },
  })

  await prisma.product.create({
    data: {
      name: 'Graphic Print T-Shirt',
      description: 'Stylish graphic t-shirt with modern design',
      price: 34.99,
      images: ['/images/p12-1.jpg', '/images/p12-2.jpg'],
      categoryId: tshirts.id,
      stock: 75,
      sku: 'TSH-002',
    },
  })

  // Jeans
  await prisma.product.create({
    data: {
      name: 'Slim Fit Blue Jeans',
      description: 'Classic slim fit jeans in versatile blue wash',
      price: 79.99,
      images: ['/images/p21-1.jpg', '/images/p21-2.jpg'],
      categoryId: jeans.id,
      stock: 50,
      sku: 'JNS-001',
    },
  })

  await prisma.product.create({
    data: {
      name: 'Distressed Black Jeans',
      description: 'Trendy distressed black jeans with perfect fit',
      price: 89.99,
      images: ['/images/p22-1.jpg', '/images/p22-2.jpg'],
      categoryId: jeans.id,
      stock: 45,
      sku: 'JNS-002',
    },
  })

  // Shoes
  await prisma.product.create({
    data: {
      name: 'Classic Sneakers',
      description: 'Comfortable everyday sneakers for casual wear',
      price: 99.99,
      images: ['/images/p31-1.jpg', '/images/p31-2.jpg'],
      categoryId: shoes.id,
      stock: 30,
      sku: 'SHO-001',
    },
  })

  await prisma.product.create({
    data: {
      name: 'Running Shoes',
      description: 'High-performance running shoes with advanced cushioning',
      price: 129.99,
      images: ['/images/p32-1.jpg', '/images/p32-2.jpg'],
      categoryId: shoes.id,
      stock: 25,
      sku: 'SHO-002',
    },
  })

  // Add some reviews
  const products = await prisma.product.findMany()
  for (const product of products) {
    await prisma.review.create({
      data: {
        rating: 5,
        title: 'Great product!',
        comment: 'Really happy with this purchase. Excellent quality and fast delivery.',
        userId: user.id,
        productId: product.id,
      },
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
