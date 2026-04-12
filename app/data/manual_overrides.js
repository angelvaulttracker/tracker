window.SONNY_MANUAL_OVERRIDES = (() => {
  const items = {};

  function assign(id, patch) {
    items[id] = {
      ...(items[id] || {}),
      ...patch,
    };
  }

  function mapUnrefinedSeries({ artById = {}, secretIds = [] }) {
    Object.entries(artById).forEach(([id, artPath]) => {
      assign(id, { artPath, artSource: "manual-web-override" });
    });

    secretIds.forEach((id) => {
      assign(id, { isSecret: true });
    });
  }

  mapUnrefinedSeries({
    artById: {
      "page-18-01-rabbit":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/11__rabbit.png",
      "page-18-02-elephant":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/03__elephant.png",
      "page-18-03-panda":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/04__panda.png",
      "page-18-04-cheetah":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/01__cheetah.png",
      "page-18-05-tiger":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/06__tiger.png",
      "page-18-06-lion":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/12__lion.png",
      "page-18-07-cockerel":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/02__cockerel.png",
      "page-18-08-dalmatian":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/09__dalmatian.png",
      "page-18-09-frog":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/10__frog.png",
      "page-18-10-koala":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/08__koala.png",
      "page-18-11-monkey":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/05__monkey.png",
      "page-18-12-crocodile":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/07__crocodile.png",
    },
    secretIds: ["page-18-13-chipmunk"],
  });

  assign("page-18-13-chipmunk", {
    artPath: "./app/assets/manual/unrefined-chipmunk.jpg",
    artSource: "manual-upload",
  });

  assign("page-18-14-robby-angel", {
    artPath: "./app/assets/manual/unrefined-robby-ver-1.jpg",
    artSource: "manual-upload",
  });

  mapUnrefinedSeries({
    artById: {
      "page-18-15-mouse":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/10__mouse.png",
      "page-18-16-lesser-panda":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/03__lesser-panda.png",
      "page-18-17-giraffe":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/04__giraffe.png",
      "page-18-18-fawn":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/01__fawn.png",
      "page-18-19-parakeet":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/05__parakeet.png",
      "page-18-20-cow":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/09__cow.png",
      "page-18-21-white-bear":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/06__white-bear.png",
      "page-18-22-uribou":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/07__uribou.png",
      "page-18-23-rhinoceros":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/08__rhinoceros.png",
      "page-18-24-sheep":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/12__sheep.png",
      "page-18-25-reindeer":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/11__reindeer.png",
      "page-18-26-pig":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/02__pig.png",
    },
    secretIds: ["page-18-27-kappa"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-19-01-parrot":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/07__parrot.png",
      "page-19-02-gorilla":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/02__gorilla.png",
      "page-19-03-alpaca":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/05__alpaca.png",
      "page-19-04-buffalo":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/04__buffalo.png",
      "page-19-05-zebra":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/09__zebra.png",
      "page-19-06-american-shorthair":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/03__american-short-hair.png",
      "page-19-07-hippopotamus":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/01__hippopotamus.png",
      "page-19-08-chameleon":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/11__chameleon.png",
      "page-19-09-french-bulldog":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/06__french-bull-dog.png",
      "page-19-10-duckbill":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/10__duckbill.png",
      "page-19-11-lop-ear-rabbit":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/08__lop-ear-rabbit.png",
      "page-19-12-owl":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/12__owl.png",
    },
    secretIds: ["page-19-13-unicorn"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-19-15-snake":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/12__snake.png",
      "page-19-16-horse":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/01__horse.png",
      "page-19-17-chihuahua":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/03__chihuahua.png",
      "page-19-18-peacock":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/10__peacock.png",
      "page-19-19-shiba-inu":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/04__shiba-inu.png",
      "page-19-20-hamadryas-baboon":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/06__hamadryas-baboon.png",
      "page-19-21-mongoose":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/05__mongoose.png",
      "page-19-22-skunk":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/08__skunk.png",
      "page-19-23-calico-cat":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/07__calico-cat.png",
      "page-19-24-japanese-crane":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/09__japanese-crane.png",
      "page-19-25-goat":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/02__goat.png",
      "page-19-26-duck":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/11__duck.png",
    },
    secretIds: ["page-19-27-dragon"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-20-01-shark":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/12__shark.png",
      "page-20-02-jellyfish":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/02__jellyfish.png",
      "page-20-03-dolphin":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/03__dolphin.png",
      "page-20-04-seal":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/04__seal.png",
      "page-20-05-seahorse":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/05__seahorse.png",
      "page-20-06-whale":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/06__whale.png",
      "page-20-07-clownfish":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/07__clownfish.png",
      "page-20-08-shell":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/08__shell.png",
      "page-20-09-penguin":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/09__penguin.png",
      "page-20-10-ray":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/10__ray.png",
      "page-20-11-blowfish":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/11__blowfish.png",
      "page-20-12-starfish":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/01__starfish.png",
    },
    secretIds: ["page-20-13-turtle"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-20-15-mangosteen":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/01__mangosteen.png",
      "page-20-16-peach":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/02__peach.png",
      "page-20-17-persimmon":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/03__persimmon.png",
      "page-20-18-pear":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/04__pear.png",
      "page-20-19-strawberry":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/05__strawberry.png",
      "page-20-20-grape":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/06__grapes.png",
      "page-20-21-watermelon":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/08__watermelon.png",
      "page-20-22-melon":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/07__melon.png",
      "page-20-23-lemon":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/09__lemon.png",
      "page-20-24-chestnut":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/10__chestnut.png",
      "page-20-25-pineapple":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/11__pineapple.png",
      "page-20-26-apple":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/12__apple.png",
    },
    secretIds: ["page-20-27-seed-leaf"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-21-01-rose":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/01__rose.png",
      "page-21-02-cherry-blossoms":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/12__cherry-blossoms.png",
      "page-21-03-poppy":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/03__poppy.png",
      "page-21-04-dandelion":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/04__dandelion.png",
      "page-21-05-cactus":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/05__cactus.png",
      "page-21-06-morning-glory":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/06__morning-glory.png",
      "page-21-07-lily-bell":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/07__lily-bell.png",
      "page-21-08-hydrangea":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/08__hydrangea.png",
      "page-21-09-pansy":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/09__pansy.png",
      "page-21-10-carnation":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/10__carnation.png",
      "page-21-11-acorn":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/11__acorn.png",
      "page-21-12-tulip":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/02__tulip.png",
    },
    secretIds: ["page-21-13-bee"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-21-15-carrot":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/01__carrot.png",
      "page-21-16-tomato":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/02__tomato.png",
      "page-21-17-bamboo-shoot":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/03__bamboo-shoot.png",
      "page-21-18-sweet-potato":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/04__sweet-potato.png",
      "page-21-19-onion":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/05__onion.png",
      "page-21-20-radish":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/06__radish.png",
      "page-21-21-green-pepper":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/08__pimento.png",
      "page-21-22-eggplant":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/07__eggplant.png",
      "page-21-23-japanese-ginger":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/09__japanese-ginger.png",
      "page-21-24-corn":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/11__corn.png",
      "page-21-25-japanese-radish":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/10__japanese-radish.png",
      "page-21-26-cabbage":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/12__cabbage.png",
    },
    secretIds: ["page-21-27-shiitake"],
  });

  assign("page-10-10-white-bear", {
    artPath: "./app/assets/manual/animal-series-1-white-bear.png",
    artSource: "manual-upload",
  });

  assign("page-10-13-chipmunk", {
    isSecret: true,
  });

  assign("page-22-11b-sunflower-lion-rainbow", {
    isSecret: true,
  });

  assign("page-10-14-robby-angel", {
    artPath: "./app/assets/manual/animal-series-1-robby.png",
    artSource: "manual-upload",
  });

  [
    "page-89-01-white-rabbit",
    "page-89-02-pink-rabbit",
    "page-89-03-white-bear",
    "page-89-04-brown-bear",
  ].forEach((id) => {
    assign(id, {
      displaySeries: "Plush Collection -Cuddly Rabbit & Bear-",
    });
  });

  [
    "page-54-09-astronaut",
    "page-54-10-moon",
    "page-54-11-alien",
    "page-54-12-earth",
    "page-54-13-sun",
    "page-54-14-rocket",
    "page-54-15-ufo",
    "page-54-16-alien-robby-angel",
  ].forEach((id) => {
    assign(id, {
      displaySeries: "Sonny Angel In Space Adventure Series (2020)",
    });
  });

  assign("page-54-07-chipmunk", {
    isSecret: true,
  });

  assign("page-54-15-ufo", {
    isSecret: true,
  });

  assign("page-55-07-humpty-dumpty", {
    isSecret: true,
  });

  assign("page-56-09-happy-pink", {
    isSecret: true,
  });

  assign("page-56-10-lucky-orange", {
    badges: ["lucky"],
  });

  assign("page-56-12-lucky-purple", {
    badges: ["lucky"],
  });

  assign("page-56-13-lucky-pink", {
    badges: ["lucky"],
  });

  assign("page-57-09-doberman", {
    isSecret: true,
  });

  assign("page-57-10-lucky-pomeranian-blue", {
    badges: ["lucky"],
  });

  assign("page-57-11-lucky-pomeranian-orange", {
    badges: ["lucky"],
  });

  assign("page-57-12-lucky-pomeranian-pink", {
    badges: ["lucky"],
  });

  assign("page-58-07-movie-night-sonny-angel", {
    artPath: "./app/assets/hero/secret-movie-night.png",
    artSource: "manual-web-override",
    isSecret: true,
  });

  assign("page-58-08-movie-night-robby-angel", {
    artPath: "./app/assets/hero/movie-night-robby.png",
    artSource: "manual-web-override",
  });

  assign("page-58-14-mint-rabbit", {
    isSecret: true,
  });

  assign("page-59-07-friendship-work-with-robby-angel", {
    isSecret: true,
    isRobby: false,
  });

  assign("page-59-10-friendship-work-with-sonny-angel", {
    isRobby: true,
  });

  assign("page-60-05-classical", {
    isSecret: true,
  });

  assign("page-60-11-happy-little-bear", {
    isSecret: true,
  });

  assign("page-61-06-golden-lucky-cat", {
    isSecret: true,
  });

  assign("page-61-08-lucky-daruma-victory", {
    badges: ["lucky"],
  });

  assign("page-61-09-lucky-daruma-great-blessing", {
    badges: ["lucky"],
  });

  assign("page-61-10-lucky-daruma-love", {
    badges: ["lucky"],
  });

  assign("page-61-11-lucky-daruma-good-luck", {
    badges: ["lucky"],
  });

  assign("page-61-18-jeju-surfer", {
    isSecret: true,
  });

  assign("page-62-13-ny-bull", {
    isSecret: true,
  });

  assign("page-62-07-lantern-dragon", {
    isSecret: true,
  });

  assign("page-62-22-i-heart-seoul", {
    isSecret: true,
  });

  assign("page-63-07-pineapple-swimmer", {
    isSecret: true,
  });

  assign("page-63-21-chipmunk", {
    isSecret: true,
  });

  assign("page-64-13-kappa", {
    isSecret: true,
  });

  assign("page-64-26-unicorn", {
    isSecret: true,
  });

  assign("page-69-13-peanut", {
    isSecret: true,
  });

  assign("page-70-14-potted-plant", {
    isSecret: true,
  });

  assign("page-70-19-saun-nomini", {
    isSecret: true,
  });

  assign("page-71-13-mini-marie-antoinette", {
    isSecret: true,
  });

  assign("page-72-18-rabbit", {
    isSecret: true,
  });

  assign("page-73-11-santa-claus", {
    isSecret: true,
  });

  assign("page-73-12-reindeer", {
    isSecret: true,
  });

  assign("page-74-09-single-rose", {
    isSecret: true,
  });

  assign("page-74-16-pass", {
    isSecret: true,
  });

  assign("page-74-22-free-your-style", {
    isSecret: true,
  });

  [
    "page-22-03-round-balloon",
    "page-22-04-present-hug",
    "page-22-08-heart-hug",
    "page-22-09-star-balloon",
    "page-22-10-birthday-cake-hug",
    "page-22-13-heart-balloon",
    "page-22-14-aurora-balloon-bear",
    "page-22-15-aurora-robby-angel",
  ].forEach((id) => {
    assign(id, {
      displaySeries: "Birthday Gift Bear (2021)",
    });
  });

  assign("page-22-14-aurora-balloon-bear", {
    isSecret: true,
  });

  assign("page-23-11-special-cake", {
    isSecret: true,
  });

  assign("page-23-14-aurora", {
    isSecret: true,
  });

  assign("page-66-07-aurora", {
    isSecret: true,
  });

  assign("page-24-20-laurel-crown", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/laurel-crown-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-24-25-chu", {
    isSecret: true,
  });

  assign("page-25-11-chipmunk", {
    isSecret: true,
    catalogSortSlot: 13.5,
  });

  assign("page-26-13-unicorn", {
    isSecret: true,
  });

  assign("page-27-13-seed-leaf", {
    isSecret: true,
  });

  assign("page-28-13-unicorn", {
    isSecret: true,
  });

  assign("page-29-08-dinner-rabbit", {
    isSecret: true,
    catalogSortSlot: 7.5,
  });

  assign("page-29-06-dinner-robby-angel", {
    catalogSortSlot: 8.5,
  });

  assign("page-30-07-snow-fairy-fox", {
    isSecret: true,
  });

  assign("page-30-08-snow-fairy-lop-ear-rabbit", {
    isSecret: true,
  });

  assign("page-30-09-snow-fairy-mouse", {
    isSecret: true,
  });

  assign("page-30-18-santa-s-helper-mouse", {
    isSecret: true,
  });

  assign("page-31-01-stuffed-robby", {
    isRobby: false,
  });

  assign("page-31-07-angel", {
    isSecret: true,
  });

  assign("page-31-13-classic-santa", {
    isSecret: true,
  });

  assign("page-31-14-classic-reindeer", {
    isSecret: true,
  });

  assign("page-31-20-wool-snowman", {
    isSecret: true,
  });

  assign("page-33-05-santa-claus", {
    isSecret: true,
  });

  assign("page-33-06-reindeer", {
    isSecret: true,
  });

  assign("page-33-12-santa-claus", {
    isSecret: true,
  });

  assign("page-33-13-reindeer", {
    isSecret: true,
  });

  assign("page-33-19-santa-claus", {
    isSecret: true,
  });

  assign("page-33-20-reindeer", {
    isSecret: true,
  });

  assign("page-33-26-santa-claus", {
    isSecret: true,
  });

  assign("page-33-27-reindeer", {
    isSecret: true,
  });

  assign("page-32-05-santa-claus", {
    isSecret: true,
  });

  assign("page-32-06-reindeer", {
    isSecret: true,
  });

  assign("page-32-10-star-pendant", {
    isSecret: true,
  });

  assign("page-32-11-cross-pendant", {
    isSecret: true,
  });

  assign("page-32-12-snowflake-pendant", {
    isSecret: true,
  });

  assign("page-32-20-santa-claus", {
    isSecret: true,
  });

  assign("page-32-25-santa-claus", {
    isSecret: true,
  });

  assign("page-34-07-santa-claus", {
    isSecret: true,
  });

  assign("page-34-08-reindeer", {
    isSecret: true,
  });

  assign("page-34-17-lop-ear-rabbit", {
    isSecret: true,
  });

  assign("page-35-07-pink-bear", {
    isSecret: true,
  });

  assign("page-35-08-blue-bear", {
    isSecret: true,
  });

  assign("page-35-09-rabbit", {
    isSecret: true,
  });

  assign("page-36-06-love-lop-ear-rabbit", {
    isSecret: true,
  });

  assign("page-36-07-love-red-rabbit", {
    isSecret: true,
  });

  assign("page-36-08-chocolate-robby-angel", {
    isSecret: true,
    catalogSortSlot: 10.5,
  });

  assign("page-36-09-love-pink-rabbit", {
    isSecret: true,
  });

  assign("page-36-10-balloon", {
    catalogSortSlot: 5.5,
  });

  assign("page-37-07-unicorn", {
    isSecret: true,
  });

  assign("page-37-13-chocolate-toy-poodle", {
    isSecret: true,
  });

  assign("page-37-19-chocolate-rabbit", {
    isSecret: true,
  });

  assign("page-38-05-single-rose", {
    isSecret: true,
  });

  assign("page-38-06-rose-bouquet", {
    isSecret: true,
  });

  assign("page-38-12-teddy-bear", {
    isSecret: true,
  });

  assign("page-38-13-sweet-kitty", {
    isSecret: true,
  });

  assign("page-38-26-mint-chocolate", {
    isSecret: true,
  });

  assign("page-38-27-mint-chocolate", {
    isSecret: true,
  });

  assign("page-39-13-cats", {
    isSecret: true,
  });

  assign("page-40-13-burry-designs-with", {
    isSecret: true,
  });

  assign("page-39-08-easter-bunny", {
    series: "Easter Series 2018",
  });

  assign("page-39-22-hatched-egg", {
    series: "Easter Series 2018",
  });

  assign("page-40-15-koala-bunny", {
    name: "Easter Cow",
    series: "Easter Series 2018",
  });

  assign("page-39-11-easter-lamb", {
    series: "Easter Series 2018",
  });

  assign("page-39-21-easter-bunny", {
    series: "Easter Series 2018",
    isSecret: true,
  });

  assign("page-39-09-hoiched-eada", {
    name: "Hatched Egg",
    series: "Easter Series 2018",
    isSecret: true,
  });

  assign("page-40-18-robhy-hot-angel", {
    name: "Paint Robby Angel",
    series: "Easter Series 2018",
  });

  assign("page-40-28-easter-bunny-secret-2017", {
    isSecret: true,
  });

  assign("page-40-29-egg-bonnet-secret-2017", {
    isSecret: true,
  });

  assign("page-40-35-easter-bunny-secret-2016", {
    isSecret: true,
  });

  assign("page-40-36-easter-egg-secret-2016", {
    isSecret: true,
  });

  assign("page-40-01-robby-angel-eog", {
    series: "Page 40 Review Queue",
  });

  assign("page-40-12-easter-agg", {
    series: "Page 40 Review Queue",
  });

  assign("page-40-09-by-decorated-easter", {
    series: "Page 40 Review Queue",
  });

  assign("page-40-19-rabbit", {
    series: "Page 40 Review Queue",
  });

  assign("page-40-17-easter-bunny", {
    series: "Page 40 Review Queue",
  });

  assign("page-40-16-easter", {
    series: "Page 40 Review Queue",
  });

  assign("page-41-07-rabbit-pumpkin-orange", {
    isSecret: true,
  });

  assign("page-41-08-rabbit-pumpkin-purple", {
    isSecret: true,
  });

  assign("page-41-09-rabbit-pumpkin-green", {
    isSecret: true,
  });

  assign("page-41-14-rabbit-pumpkin-pink", {
    isSecret: true,
  });

  assign("page-42-05-witch", {
    isSecret: true,
  });

  assign("page-42-06-ghost", {
    isSecret: true,
  });

  assign("page-42-12-witch", {
    isSecret: true,
  });

  assign("page-42-13-pumpkin", {
    isSecret: true,
  });

  assign("page-42-15-vampire", {
    isSecret: true,
  });

  assign("page-42-19-vampire", {
    isSecret: true,
  });

  assign("page-42-26-ghost", {
    isSecret: true,
  });

  assign("page-42-27-witch", {
    isSecret: true,
  });

  assign("page-43-07-pumpkin", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2007/pumpkin-gold-secret-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-43-08-ghost", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2007/ghost-gold-secret-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-45-05-cherry", {
    isSecret: true,
  });

  assign("page-45-11-cherry", {
    isSecret: true,
  });

  assign("page-45-17-cherry", {
    isSecret: true,
  });

  assign("page-46-07-bumblebee", {
    isSecret: true,
  });

  assign("page-46-13-mexican-cactus", {
    isSecret: true,
  });

  assign("page-46-14-pink-rabbit", {
    isSecret: true,
  });

  assign("page-46-15-pink-monkey", {
    isSecret: true,
  });

  assign("page-46-16-pink-mouse", {
    isSecret: true,
  });

  assign("page-46-17-pink-parrot", {
    isSecret: true,
  });

  assign("page-47-05-carrot", {
    isSecret: true,
  });

  assign("page-47-10-ice", {
    isSecret: true,
  });

  assign("page-47-17-caribbean-hat", {
    isSecret: true,
  });

  assign("page-48-11-sailor", {
    isSecret: true,
  });

  assign("page-49-11-white-swimwear", {
    isSecret: true,
  });

  assign("page-50-13-lifeguard", {
    isSecret: true,
  });

  assign("page-51-09-happiness", {
    isSecret: true,
  });

  assign("page-52-11-dino-hatchling", {
    isSecret: true,
  });

  assign("page-53-07-merry-go-round", {
    isSecret: true,
  });

  assign("page-53-15-silk-hat-rabbit", {
    isSecret: true,
  });

  assign("page-79-05-colorful-cake-rabbit", {
    isSecret: true,
  });

  assign("page-79-22-12th-anniversary-cake", {
    isSecret: true,
  });

  assign("page-80-13-11th-anniversary-cake", {
    isSecret: true,
  });

  assign("page-105-13-seed-leaf", {
    isSecret: true,
  });

  assign("page-31-26-wood-doll-santa", {
    isSecret: true,
  });

  assign("page-31-27-reindeer-plushie", {
    isSecret: true,
  });

  assign("page-31-28-pierrot-angel", {
    name: "Pierrot Robby Angel",
  });

  assign("page-96-07-strawberry-jam", {
    isSecret: true,
  });

  assign("page-97-13-honey-bee", {
    isSecret: true,
  });

  assign("page-98-12-white-bear", {
    isSecret: true,
  });

  assign("page-98-14-red-bear", {
    isSecret: true,
  });

  assign("page-99-07-santa-claus", {
    isSecret: true,
  });

  assign("page-100-07-ghost", {
    isSecret: true,
  });

  assign("page-101-13-big-hamburger", {
    isSecret: true,
  });

  assign("page-102-07-raincoat-rabbit", {
    isSecret: true,
  });

  assign("page-103-07-cherry-tree-rabbit", {
    isSecret: true,
  });

  assign("page-104-06-lop-ear-rabbit", {
    isSecret: true,
  });

  assign("page-49h-13-aloha", {
    isSecret: true,
  });

  [
    "page-91-01-a",
    "page-91-02-b",
    "page-91-03-c",
    "page-91-04-d",
    "page-91-05-e",
    "page-91-06-f",
    "page-91-07-g",
    "page-91-08-h",
    "page-91-09-i",
    "page-91-10-j",
    "page-91-11-k",
    "page-91-12-m",
    "page-91-13-n",
    "page-91-14-o",
    "page-91-15-r",
    "page-91-16-s",
    "page-91-17-t",
    "page-91-18-u",
    "page-91-19-w",
    "page-91-20-y",
  ].forEach((id) => {
    const parts = id.split("-");
    assign(id, {
      artLabel: parts[parts.length - 1].toUpperCase(),
      artSource: "generated-keychain",
    });
  });

  assign("page-52-11-dino-hatchling", {
    artPath: "./app/assets/manual/dinosaur-2024-dino-hatchling-crop.png",
    artSource: "manual-upload",
  });

  assign("page-52-12-egg-robby-angel", {
    artPath: "./app/assets/manual/dinosaur-2024-egg-robby-crop.png",
    artSource: "manual-upload",
  });

  assign("page-39-17-love", {
    artPath:
      "./app/assets/manual/user-photo-candidates/green-tea-tiger-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-39-04-choceiata", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentine-series-2013/milk-chocolate-zebra-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-39-02-mocha-porakest", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentine-series-2013/mocha-chocolate-parakeet-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-39-01-panda", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentine-series-2013/white-chocolate-panda-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-39-06-checelate", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentine-series-2013/strawberry-chocolate-lop-ear-rabbit-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-39-13-cats", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentine-series-2013/golden-cheetah-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-14-13-turtle", {
    artPath:
      "./app/assets/manual/user-photo-candidates/refined-turtle-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-12-13-unicorn", {
    artPath: "./app/assets/manual/user-photo-candidates/unicorn-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-11-13-kappa", {
    artPath:
      "./app/assets/manual/user-photo-candidates/refined-kappa-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-13-13-dragon", {
    artPath:
      "./app/assets/manual/user-photo-candidates/refined-dragon-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-18-27-kappa", {
    artPath:
      "./app/assets/manual/user-photo-candidates/unrefined-kappa-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-01-crown-green", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-green-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-02-crown-pink", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-pink-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-03-crown-red", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-red-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-07-crown-yellow", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-yellow-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-08-crown-orange", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-orange-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-09-crown-silver", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-silver-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-10-cross-crown-blue", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/cross-crown-blue-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-11-cross-crown-orange", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/cross-crown-orange-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-16-cross-crown-light-blue", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/cross-crown-light-blue-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-17-cross-crown-pink", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/cross-crown-pink-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-18-heart-crown-red", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/heart-crown-red-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-19-heart-crown-yellow", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/heart-crown-yellow-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-77-09-crown", {
    artPath: "./app/assets/manual/user-photo-candidates/limited-crown-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-04-cabbage", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/purple-cabbage-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-05-paprika-red", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/red-pepper-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-09-paprika-yellow", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/yellow-pepper-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-10-muscat", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/green-muskat-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-04-groove-on", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/groove-on-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-05-what-s-up", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/whats-up-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-06-rejoice", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/rejoice-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-12-fun-to-be-with", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/fun-to-be-with-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-13-hug-me", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/hug-me-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-14-sorry-mom", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/sorry-mom-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-15-yummy", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/yummy-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-15a-go-for-it", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/go-for-it-candidate.png",
    artSource: "manual-upload",
    catalogSortSlot: 15.5,
  });

  assign("page-24-21-thanks", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/thanks-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-22-cha-cha-cha", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/cha-cha-cha-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-23-sos", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/sos-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-24-cry-for-joy", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/cry-for-joy-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-25-chu", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/chu-secret-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-74-17-good-luck", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/good-luck-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-18-it-s-ok", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/its-ok-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-19-i-m-genie", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/im-genie-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-20-dream-come-true", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/dream-come-true-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-21-try-again", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/try-again-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-22-free-your-style", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/free-your-style-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-42-11-spider", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2016/spider-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-42-10-bat", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2016/bat-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-42-08-witch", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2016/witch-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-42-09-pumpkin", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2016/pumpkin-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-01-rabbit", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/rabbit-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-02-frog", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/frog-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-03-cockerel", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/cockerel-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-04-panda", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/panda-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-05-koala", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/koala-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-06-tiger", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/tiger-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-07-elephant", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/elephant-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-08-dalmation", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/dalmatian-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-09-monkey", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/monkey-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-10-cheetah", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/cheetah-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-11-crocodile", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/crocodile-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-12-lion", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/lion-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-01-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2012/santa-claus-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-02-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2012/reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-03-tree-cape", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2012/tree-cape-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-04-christmas-cake", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2012/christmas-cake-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-01-uribou-blue", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-uribou-blue-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-02-uribou-green", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-uribou-green-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-03-uribou-pink", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-uribou-pink-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-04-uribou-red", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-uribou-red-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-05-uribou-white", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-uribou-white-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-06-mouse-red", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-mouse-red-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-07-mouse-white", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-mouse-white-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-08-mouse-gold", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-mouse-gold-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-77-06-marchand-de-legumes", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/marchand-de-legumes-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-77-05-cow-gold", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/cow-gold-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-77-01-normal", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/normal-black-doll-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-01-jet-7th-anniversary", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/jet-7th-anniversary-candidate.png",
    artSource: "manual-upload",
  });

  return {
    items,
  };
})();
