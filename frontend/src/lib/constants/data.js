import shopimg1 from '../../../public/img1.webp'
import shopimg2 from '../../../public/img2.webp'
import shopimg3 from '../../../public/img3.webp'
import shopimg4 from '../../../public/img4.webp'
import shopimg5 from '../../../public/img5.webp'

export const process = [
    {
        id: '01',
        title: 'Choose Your Product',
        desc: 'Explore a wide variety of fresh produce, groceries, and more tailored to your preferences. Easily browse, pick your favorites, and add them to your personalized cart.',
    },
    {
        id: '02',
        title: 'Checkout',
        desc: 'Double-check your selected items and ensure your details are up-to-date before proceeding with our secure and hassle-free checkout process.',
    },
    {
        id: '03',
        title: 'Making Your Own Box',
        desc: 'Create your own custom box filled with products you love. Mix and match items to build a personalized selection that fits your lifestyle.',
    },
    {
        id: '04',
        title: 'Delivering',
        desc: 'Once your order is confirmed, it’s prepared for shipment. Our reliable delivery service ensures your products reach you swiftly and safely.',
    },
    {
        id: '05',
        title: 'In Your Hands',
        desc: 'Receive your order at your doorstep, open your box, and enjoy your carefully selected items. We ensure everything arrives in perfect condition.',
    },
]

export const sampleShopData = [
    {
        shop_id: 'shop001',
        shop_name: 'Green Valley Farms',
        owner: 'John Silva',
        location: 'Colombo, Sri Lanka',
        contact_number: '+94 712345678',
        email: 'greenvalley@farmcart.com',
        ratings: 4.5,
        cover_img: shopimg1,
        delivery_fee: 150,
        products: [
            {
                product_id: 'prod001',
                product_name: 'Organic Tomatoes',
                category: 'Vegetables',
                price_per_kg: 300,
                available_quantity_kg: 50,
            },
            {
                product_id: 'prod002',
                product_name: 'Fresh Spinach',
                category: 'Vegetables',
                price_per_bunch: 50,
                available_quantity_bunch: 100,
            },
        ],
        subscription_plans: [
            {
                plan_id: 'sub001',
                plan_name: 'Weekly Vegetable Box',
                price: 1200,
                description:
                    'A curated selection of fresh vegetables delivered weekly.',
            },
        ],
    },
    {
        shop_id: 'shop002',
        shop_name: "Nature's Bounty",
        owner: 'Priya Fernando',
        location: 'Kandy, Sri Lanka',
        contact_number: '+94 723456789',
        email: 'naturesbounty@farmcart.com',
        ratings: 4.7,
        cover_img: shopimg2,
        delivery_fee: 200,
        products: [
            {
                product_id: 'prod003',
                product_name: 'Mangoes',
                category: 'Fruits',
                price_per_kg: 600,
                available_quantity_kg: 30,
            },
            {
                product_id: 'prod004',
                product_name: 'Bananas',
                category: 'Fruits',
                price_per_dozen: 200,
                available_quantity_dozen: 50,
            },
        ],
        subscription_plans: [
            {
                plan_id: 'sub002',
                plan_name: 'Monthly Fruit Box',
                price: 2200,
                description:
                    'A variety of fresh seasonal fruits delivered monthly.',
            },
        ],
    },
]

export const shopList = [
    {
        shop_id: 'shop001',
        shop_name: 'Green Valley Farms',
        owner: 'John Silva',
        location: 'Colombo, Sri Lanka',
        contact_number: '+94 712345678',
        email: 'greenvalley@farmcart.com',
        ratings: 4.5,
        cover_img: shopimg1,
        delivery_fee: 150,
    },
    {
        shop_id: 'shop002',
        shop_name: "Nature's Bounty",
        owner: 'Priya Fernando',
        location: 'Kandy, Sri Lanka',
        contact_number: '+94 723456789',
        email: 'naturesbounty@farmcart.com',
        ratings: 4.7,
        cover_img: shopimg2,
        delivery_fee: 200,
    },
    {
        shop_id: 'shop003',
        shop_name: 'Sunny Meadows',
        owner: 'Rajitha Perera',
        location: 'Galle, Sri Lanka',
        contact_number: '+94 734567890',
        email: 'sunnymeadows@farmcart.com',
        ratings: 4.2,
        cover_img: shopimg3,
        delivery_fee: 180,
    },
    {
        shop_id: 'shop004',
        shop_name: 'Harvest Haven',
        owner: 'Nalini Kumar',
        location: 'Matara, Sri Lanka',
        contact_number: '+94 756789012',
        email: 'harvesthaven@farmcart.com',
        ratings: 4.6,
        cover_img: shopimg4,
        delivery_fee: 160,
    },
    {
        shop_id: 'shop005',
        shop_name: 'Fresh Fields',
        owner: 'Dilan Jayasinghe',
        location: 'Negombo, Sri Lanka',
        contact_number: '+94 765432109',
        email: 'freshfields@farmcart.com',
        ratings: 4.4,
        cover_img: shopimg5,
        delivery_fee: 170,
    },
    {
        shop_id: 'shop006',
        shop_name: 'Orchard Grove',
        owner: 'Samantha Weerasinghe',
        location: 'Anuradhapura, Sri Lanka',
        contact_number: '+94 783456789',
        email: 'orchardgrove@farmcart.com',
        ratings: 4.3,
        cover_img: shopimg5,
        delivery_fee: 190,
    },
]

export const testimonials = [
    {
        id: 'testimonial001',
        name: 'Amelia Johnson',
        position: "CEO, Johnson's Kitchen",
        photo: 'https://example.com/images/amelia-johnson.jpg',
        text: 'FarmCart has completely transformed the way I shop for fresh produce. The quality and convenience are unparalleled!',
    },
    {
        id: 'testimonial002',
        name: 'Michael Smith',
        position: "CEO, Johnson's Kitchen",
        photo: 'https://example.com/images/michael-smith.jpg',
        text: 'I love the variety and freshness of the products available on FarmCart. The delivery service is prompt and reliable.',
    },
    {
        id: 'testimonial003',
        name: 'Sophia Lee',
        position: "CEO, Johnson's Kitchen",
        photo: 'https://example.com/images/sophia-lee.jpg',
        text: 'FarmCart offers an excellent selection of fruits and vegetables. The user-friendly platform and quick delivery make it a favorite in my household.',
    },
]
