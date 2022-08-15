const craftsData = [
  {
    title: 'Larkspur Resin Necklace',
    category: 'jewelry',
    image:
      'https://i.etsystatic.com/33505632/r/il/337523/3910424155/il_794xN.3910424155_l8f4.jpg',
    description: `July's birth flower-Adventurous and Loving`,
    price: 15.0,
    stock: 10,
    rating: 5,
  },
  {
    title: 'Gladiolus Resin Necklace',
    category: 'jewelry',
    image:
      'https://i.etsystatic.com/33505632/r/il/c6352a/3910425023/il_794xN.3910425023_q95i.jpg',
    description: `August's birth flower-Strong and Confident`,
    price: 15.0,
    stock: 10,
    rating: 5,
  },
  {
    title: 'Aster Resin Necklace',
    category: 'jewelry',
    image:
      'https://i.etsystatic.com/33505632/r/il/04bd73/3862932086/il_794xN.3862932086_eit2.jpg',
    description: `September's birth flower - Dynamic and Kind`,
    price: 15.0,
    stock: 10,
    rating: 5,
  },
  {
    title: 'Cosmos Resin Necklace',
    category: 'jewelry',
    image:
      'https://i.etsystatic.com/33505632/r/il/57e93d/3910425871/il_794xN.3910425871_ifhq.jpg',
    description: `October's birth flower - Stylish and Friendly`,
    price: 15.0,
    stock: 10,
    rating: 5,
  },
  {
    title: 'Chrysanthemum Resin Necklace',
    category: 'jewelry',
    image:
      'https://i.etsystatic.com/33505632/r/il/7485c6/3862933092/il_794xN.3862933092_60dp.jpg',
    description: `November's birth flower' - Fearless and Creative`,
    price: 15.0,
    stock: 10,
    rating: 5,
  },
  {
    title: 'Narcissus Resin Necklace',
    category: 'jewelry',
    image:
      'https://i.etsystatic.com/33505632/r/il/bbcb7b/3910426747/il_794xN.3910426747_kyle.jpg',
    description: `December's birth flower - Outgoing and Confident`,
    price: 15.0,
    stock: 10,
    rating: 5,
  },
  {
    title: 'Orange Sunset Watercolor Bookmark',
    category: 'prints',
    image:
      'https://i.etsystatic.com/22679458/r/il/6e8e7d/3618552419/il_794xN.3618552419_j0lb.jpg',
    description: `Enjoy a view of an orange sunset when you get back to reading. Each bookmark is handmade using watercolor paint and paper! Dimensions are 1.5” by 5.5”.`,
    price: 5.0,
    stock: 20,
    rating: 5,
  },
  {
    title: 'Night Sky Watercolor Bookmark',
    category: 'prints',
    image:
      'https://i.etsystatic.com/22679458/r/il/614bc6/3570926706/il_794xN.3570926706_sjlt.jpg',
    description: `Enjoy a view of the night sky when you get back to reading. Each bookmark is handmade using watercolor paint and paper! Dimensions are 1.5” by 5.5”.`,
    price: 5.0,
    stock: 20,
    rating: 5,
  },
  {
    title: 'Colorful Sunset Watercolor Bookmark',
    category: 'prints',
    image:
      'https://i.etsystatic.com/22679458/r/il/c556c4/3618552539/il_794xN.3618552539_rqr0.jpg',
    description: `Enjoy a view of a colorful sunset when you get back to reading. Each bookmark is handmade using watercolor paint and paper! Dimensions are 1.5” by 5.5”.`,
    price: 5.0,
    stock: 20,
    rating: 5,
  },
  {
    title: 'Cotton Candy Sunset Watercolor Bookmark',
    category: 'prints',
    image:
      'https://i.etsystatic.com/22679458/r/il/b6e429/3618552545/il_794xN.3618552545_eotc.jpg',
    description: `Enjoy a view of a cotton candy sunset when you get back to reading. Each bookmark is handmade using watercolor paint and paper! Dimensions are 1.5” by 5.5”.`,
    price: 5.0,
    stock: 20,
    rating: 5,
  },
  {
    title: 'White Wedding Shawl',
    category: 'clothing',
    image:
      'https://i.etsystatic.com/14233350/r/il/9572b6/1352084663/il_794xN.1352084663_7zo0.jpg',
    description: `Hand knit wedding shawl made with blend of 30% mohair , 70 % acrylic. Delicate and graceful lace. Measurements: length of the upper side: 200 cm / 78.7”. Length from neckline to the top: 80 cm / 31.5”`,
    price: 65.0,
    stock: 1,
    rating: 5,
  },
  {
    title: 'Peacock Shawl',
    category: 'clothing',
    image:
      'https://i.etsystatic.com/16951444/r/il/ff2164/3837765999/il_794xN.3837765999_i076.jpg',
    description: `Measurements: Wingspan 70" inches wide and Depth is 32" inches long. One size fits all. Made with 52% Cotton and 48% Acrylic blend which is a beautiful soft gradient in the color of a peacock.`,
    price: 50.0,
    stock: 0,
    rating: 5,
  },
  {
    title: 'Ceramic Espresso Cup',
    category: 'ceramics',
    image:
      'https://i.etsystatic.com/33621855/r/il/1ec2ce/4043800468/il_794xN.4043800468_61lp.jpg',
    description:
      'Cup measures approx. 3" * 2.5". Food, dishwasher safe, but please do not microwave due to gold!',
    price: 30.4,
    stock: 3,
    rating: 5,
  },
  {
    title: 'Ceramic Dinner Plate',
    category: 'ceramics',
    image:
      'https://i.etsystatic.com/34955625/r/il/d40c20/3864018764/il_794xN.3864018764_13gm.jpg',
    description: `A set of two minimalist iron red earth plates measuring 5.1 inches and 7.5 inches in diameter. These are oven, microwave and dishwasher safe.`,
    price: 22.5,
    stock: 2,
    rating: 5,
  },
  {
    title: 'Autumn Wreath',
    category: 'plants',
    image:
      'https://i.etsystatic.com/17590463/r/il/0aa996/4033882610/il_794xN.4033882610_4y6n.jpg',
    description: `Handmade Wreath - Artificial Flowers, Foliage and Embellishments.`,
    price: 60.0,
    stock: 3,
    rating: 5,
  },
  {
    title: 'Juniper Bonsai with Glazed Ceramic',
    category: 'plants',
    image:
      'https://i.etsystatic.com/17383854/r/il/ad863d/2999132673/il_794xN.2999132673_aihm.jpg',
    description: `The bonsai is 3 to 4 years old & approximately 5" to 6" height and comes in a hand crafted glazed ceramic bonsai pot. Accent mineral and premium red lava rock top dressing included as well.`,
    price: 41.0,
    stock: 2,
    rating: 5,
  },
  {
    title: 'Handmade Fairy Garden Miniature Pond',
    category: 'plants',
    image:
      'https://i.etsystatic.com/7598674/r/il/ed8738/3210692479/il_794xN.3210692479_2sdf.jpg',
    description: `Made with a terra cotta saucer as base. Wild plants and moss are all around the saucer, with stepping stones leading into the pond. One fish is seen swimming about in the clear water. Approximately 3 1/2"-4" diameter and 1-1 1/2" to the tallest plant. Plants are either dried or faux—for indoor use.`,
    price: 24.5,
    stock: 1,
    rating: 5,
  },
];

module.exports = craftsData;
