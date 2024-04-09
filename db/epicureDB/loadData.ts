import mongoose from "mongoose";
import { RestaurantsModel, IRestaurant } from '../models/restaurants.model';
import { DishesModel, IDish } from '../models/dishes.model';
import { ChefsModel, IChef } from '../models/chefs.model';
import { IconMeaning } from "../../src/shared/enums";

async function createRestaurant(title: string, restaurantImage: string, subtitle: string, rating: Number, dishesData: any, chefOfTheWeekData: any) {
    try {
        let chef = await ChefsModel.findOne({ name: subtitle });
        if (!chef) {
            chef = new ChefsModel({
                name: subtitle,
                image: "",
                description: "",
                chefOfTheWeek: false
            });
            if (chef.name === chefOfTheWeekData.name) {
                chef.description = chefOfTheWeekData.description;
                chef.image = chefOfTheWeekData.image;
                chef.chefOfTheWeek = true;
            }
            await chef.save();
        }
        let restaurant = await RestaurantsModel.findOne({ name: title });
        if (!restaurant) {
            const dishes = [];
            for (const dishData of dishesData) {
                let dish = await DishesModel.findOne({ name: dishData.title });
                if (!dish) {
                    dish = new DishesModel({
                        title: dishData.title,
                        image: dishData.image,
                        price: dishData.price.toString(),
                        iconMeaning: dishData.iconMeaning,
                        description: dishData.description.split(", "),
                        deleted: false,
                    });
                    await dish.save();
                }
                dishes.push(dish._id);
            }

            restaurant = new RestaurantsModel({
                title: title,
                image: restaurantImage,
                rating: rating,
                deleted: false,
                chef: chef._id,
                dishes: dishes
            });
            await restaurant.save();

            chef.restaurants.push(restaurant._id);
            await chef.save();

            for (const dishId of dishes) {
                await DishesModel.findByIdAndUpdate(dishId, { restaurant: restaurant._id });
            }
        }

        console.log(`Restaurant ${title} created successfully!`);
    } catch (error) {
        console.error("Error creating restaurant:", error);
    }
}

const restaurantsData = [
    {
        title: "Claro",
        image: "https://s3-alpha-sig.figma.com/img/868d/15e4/c3a1aa1bfb70ad4213eb3d21cb0a095a?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HfTKKrC~Xd3bVJ27LR~Rx~OJmk-dBGv9iewAU9zYOWCZlPbVZ6~P2skQyWaGt-4ksoZqNK44705qXlTwCjVhQlCXFhfq85tvbB4zP~3jcCg26Ci2HVhcDR7gXQMhrnW8QBckeOylaFuNEtgP~WOVDBC6x-t0TYYvXV8-1qVj5zJwHN1fskIBZP7GuqRpr6leYJBqA6egSBRAjPjk8~aV4pZ9J13TXgRi~PCp9VKRz6P~JX~7odkWDRUxTRRHgaR-unq6S0sdqSt~SPEE9f8QylTwxdocvaOBHp2mS9bEfQ4n5nMR-yXiamBD8mXm6IUTdBQcMa0q-bwfQS6yDcoFAQ__",
        subtitle: "Ran Shmueli",
        rating: 4,
        dishes: [
            {
                title: "Pad Ki Mao",
                image: "https://s3-alpha-sig.figma.com/img/2e67/b1b2/d214756da8c972edb6e1ab3b02c205d4?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cxImKvZg2RugsYxx0nHfc1UmhgbuPBpjtvdLumSEGXG2qV9pMO9v6lCk0zev9GvkMJAt38uxY1HeNtDiOtAU22L~Zpxhpy9ERUDBcUo9ip4UHzXogOXQarOPA8BN9qQ6G1gYY27T~O0NJnLxKn26JlGpprTisokFbns1pZH3-YfNu75geqGy2tP9gNNhyiBfCEkPnCuZMCLKYQ1xyZFw6wuviMooktk4~QNZtMMMWnT9AJzXDtNA9iRI9omYeFgUoZnLY6xBh195YCcjCeV1PXQHdfum7JP0KvL3FdQawetC6jIe78ocizBrnEr-EkmNmJNAAivhgj4HKrm~zCfzbQ__",
                description: "Shrimps, Glass Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic Chili Brown Coconut",
                iconMeaning: IconMeaning.SPICY,
                price: 88,
            }
        ]
    },
    {
        title: "Kab Kem",
        image: "https://s3-alpha-sig.figma.com/img/15f3/248b/cd0b41673fd3f1efc286ad79bd13d7e5?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y3GhV1f-OHZ-4xuR~i1IT~SjjgzF1Fr4Hg3GZTYHPpRxQqDeD4rSQFBESvRtJWtCoEUl28kWmPIcp5X8P3K4aYrrlTn5ASubcjf0CcM-PxCuFmeVxfdUEYsPrqT800oSIDPZINvNERUiROunxyzIBNCZwz0KYr3l8PKXiFDOdKbUX0M9KTnN44NO0~2-Ru43Xk1Jvj-vvOMfwoHCa22~E5O2K269qRzO9GtMXDpRxE56TbFn7SZ21-USO4I8bOHCLifOHp6IFD8Ur8U1c~Dix9d6x0RyAlQwQumKHiLngFAlCp-hkwJJ6TYjXWlMYqlCTVSwkh2QagQjk2buqHFDZA__",
        subtitle: "Yariv Malili",
        rating: 2,
        dishes: [
            {
                title: "Garbanzo Frito",
                image: "https://s3-alpha-sig.figma.com/img/fad3/833e/ef4a5437c9ed2d59faca58b36ba47058?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VEaF8p-s~F57FvyLWGNLr1fdx-WqkojBDD1-F5d9AeW-UKY6KrfMWFb6GqFpM3WazH4sfPE~53BFD8u6Ojp2zetiIq8O7c3NJIlYORlO3QDnw69w1H5~LaB9Jn96P3KV3A-GVwkotS8lOCYD~KI3YOPIVlJizyES3nx5P1ijKZRNa7JSsCq-6LRkJcarj4PhjzpvbgfCiv8IuoJHge2FhqUrdSeJ3fZzeAn-h8RntD3uLreRfn3fUMc~cDOxLUvSlqEodLOlVR5mzhirIuxfSMj-LFVW6GehqKLhi88VJWuFnrfi51yegjfCD-6fE1-i103gZpZ56COUlieU04iXCA__",
                description: "Polenta fingers, veal cheek, magic chili cured lemoncream, yellow laksa",
                iconMeaning: IconMeaning.VEGAN,
                price: 98
            }
        ]
    },
    {
        title: "Messa",
        image: "https://s3-alpha-sig.figma.com/img/adc1/c0a8/826a7820e6071efc5ed184218d4e3193?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FPQO5ikB~GAapxmThOnx7oObDdLSQ1ayczQ~QCfYdDK7vaimcKoGii3Ag5VszYPdNDyZaFVA3k6446cTJ3k6DyqQVXpvOpokJhCshb7~H9gHh7hC-PRzy0p8SJgqJfg7t~9wKop7kFK0Z-owWr9XrCA4fXlQ59VzCtTQngyjaGX47tVYPKOy8lb29QUrGylAoLo8mXlrzMlqXrZeh5QAVtz6e8R3EirMIj3WmHpKy3eDTUqKeR3Ss9w6ZwfrNbzJOZqRszPAX7ZCCUyNo5W61tEgmJzl0tQLtLsYMcLHbvyKIcjyg-3uBr8pBumpNEnsffCWzoiQLSLPaQGJjGIKpw__",
        subtitle: "Aviv Moshe",
        rating: 1,
        dishes: [
            {
                title: "Ta Ma La Ko",
                image: "https://s3-alpha-sig.figma.com/img/99e5/c701/f2696ee9d6e4cb77fb808ddeb96f5352?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p2vum1AL6guS76kWcgZKOW31l4Ll5I9mnLUmANRrKiBihSUwqu~jm0IwMOSTo-IQxK6c9-0Bh67F53TYJx4imEbXIet2H6syI2KY-nBsCBcupldFGUcBW7834YjBNmuN1j~K6lSXpgNcT6xbBmx6vJMhj4niYXc0-C4s0asM4s~oNXhvvKi7oTb4aeM9G-VZqp-R7nWJ5DH8-GHR48K9dBSjpk07gvyd69gacajFxQ7AebBZtIVX5r62L3d9S3lufq21u9XyGWm9nVNfINARhpiSoRDs0oD4lyEBcMCqDkgn43fv2LeJS0ZIi3Elj6OKukKqTF7Z-j5N031xWmqklg__",
                description: "Shrimps, Glass Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic Chili Brown Coconut",
                iconMeaning: IconMeaning.VEGAN,
                price: 98
            }
        ]
    },
    {
        title: "Nitan Thai",
        image: "https://s3-alpha-sig.figma.com/img/e4c8/9917/f6704ce9e7d0a2f1ff3a0531f50880f9?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i8o99oqdN9RzrzNQMCglWAx9xardMtqUoxZtYFkltVw~EP4V9jAZdsGzb5-~Nqsxjsv7TmqDhKuSN-nO3KLqNHykcmO7izii7hp4oODuojs2VI22V24MBn8d4qNi8ju0ItotWHfdoa5DEtliVenJjWnl2h2~SNSzFN6AmSaD0klya~QGrcrI~7qhtCTgy2mKZpmYGkFsMD6F2ChTqwVI3reD4e0RD5dptKXgVzBCj1Fihu0aWbXZ8fJw7~ZmxkX34kaGWdgHCZdJVz0SDanaGBKSfn1hIhGddyiUXa4QiqnQxAUju66oMdLJe~BJmg705aWoaRQebmw7AIV41SpWYQ__",
        subtitle: "Shahaf Shabtay",
        rating: 1,
        dishes: [
            {
                title: "Ta Ma La Ko",
                image: "https://s3-alpha-sig.figma.com/img/99e5/c701/f2696ee9d6e4cb77fb808ddeb96f5352?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p2vum1AL6guS76kWcgZKOW31l4Ll5I9mnLUmANRrKiBihSUwqu~jm0IwMOSTo-IQxK6c9-0Bh67F53TYJx4imEbXIet2H6syI2KY-nBsCBcupldFGUcBW7834YjBNmuN1j~K6lSXpgNcT6xbBmx6vJMhj4niYXc0-C4s0asM4s~oNXhvvKi7oTb4aeM9G-VZqp-R7nWJ5DH8-GHR48K9dBSjpk07gvyd69gacajFxQ7AebBZtIVX5r62L3d9S3lufq21u9XyGWm9nVNfINARhpiSoRDs0oD4lyEBcMCqDkgn43fv2LeJS0ZIi3Elj6OKukKqTF7Z-j5N031xWmqklg__",
                description: "Shrimps, Glass Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic Chili Brown Coconut",
                iconMeaning: IconMeaning.VEGAN,
                price: 98
            }
        ]
    },
    {
        title: "Tiger Lilly",
        image: "https://s3-alpha-sig.figma.com/img/3576/5c67/fcbfbed8fe1dce8d9796c757e0a9f0ff?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QNnkW60843hdseJD8v2McZkczB~wMPB1DBeILzepGN6JXMx5bcsMV0diDbYdtVD2wTSGwE8ut8YIA96p79lyyOQY0efcTCyDF-nA72lZiegQOcF0ApnhQcO5-jZsQXuEV6ALMjL9Ty8LuozuCUkQAT0mL0DI5Tzfx3tB7JXz9~f6weGjCqDzuR32zbV4SZA0qR69wUQViPS0cehSDgnoYytvZVwfg4zsZGgtvl38Xa5iUHqT6ezcYrm5o4qcYj2Z1Cc3vlVJXDkQ8WvxT7Ivaq2gf6mbQad1XrzX9zXyzGytJ9R95LvJMbEcwtkFNveFIAfhlItNXu2RQ4NOd6i4fA__",
        subtitle: "Yanir Green",
        rating: 4,
        dishes: [
            {
                title: "Pizza",
                image: "https://s3-alpha-sig.figma.com/img/5209/515e/cfc01ace5fbccb9616c956c889eb5640?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SIujE3RDeC-ggk9QtKt2K6bymx2xiow2NW83NCKgIkkryJPne6FZPKZRnEITSBSvYODNgHpto0gcHtbCE14ymHAjj~b7FdpAbb4cyZVcdddH4OmpC05kelj~gz0GLAHbtg8AOlwXiJlWqBVV~LqVLZxmkZ4SyPZAvS4ltGaCOzPNXBbPTLkrFdr99Q9RmmGXMi~ybZvcH-ps3EDbop~hACAEOhr7aboDqYOACkPrcOjXGnTr8Ew3ugFekb~uDIWnd7aXArtkZHBAIqC9UsNlLShrTG9mxuYeyENu-38TiT-zYQhRhbNsyQdWAtFbtt2Y3IVG0t2hQ4KnPm1SRO84Kw__",
                description: "Dough, Mozzarella Cheese, Tomato Sauce, Mushrooms, Onions, Olives",
                iconMeaning: IconMeaning.SPICY,
                price: 78
            }
        ]
    },
    {
        title: "Ya Pan",
        image: "https://s3-alpha-sig.figma.com/img/54b2/906a/432b047e9fc8fd209015032d096a8202?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n4sqUxgsaKwUf6Byoq8-qG~q-tXBg8ofgzy27fGcQWCBWZlyDy9FFAejHOOK7uSfsiJo9eMgv8Wq21RMhdpqta3rylw8Az8I6RDlJNfUA9Cf0xf~t3IStyuVrMBNQiynp6--m20HRXXqU6RIJlvy9i7jeuaw1gR8XLfs~WkGcJoEA5OtgxvDXy9~UhP2ivDfebMaUQ7iLEQJ-pjdeAsPBXtYOYUU1sXWGF~kYrB-wJj6m8ANKNsFZ~msLYJEMMYwy8bP5oXaXm9k1s92xrgq9ol~diagOuTevV7JlO0mWKtRb4v8puIojP~PXvaOBG~mPCtX3B0R6y1ViIkcuE~sAw__",
        subtitle: "Yuval Ben Moshe",
        rating: 2,
        dishes: [
            {
                title: "Garbanzo Frito",
                image: "https://s3-alpha-sig.figma.com/img/fad3/833e/ef4a5437c9ed2d59faca58b36ba47058?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VEaF8p-s~F57FvyLWGNLr1fdx-WqkojBDD1-F5d9AeW-UKY6KrfMWFb6GqFpM3WazH4sfPE~53BFD8u6Ojp2zetiIq8O7c3NJIlYORlO3QDnw69w1H5~LaB9Jn96P3KV3A-GVwkotS8lOCYD~KI3YOPIVlJizyES3nx5P1ijKZRNa7JSsCq-6LRkJcarj4PhjzpvbgfCiv8IuoJHge2FhqUrdSeJ3fZzeAn-h8RntD3uLreRfn3fUMc~cDOxLUvSlqEodLOlVR5mzhirIuxfSMj-LFVW6GehqKLhi88VJWuFnrfi51yegjfCD-6fE1-i103gZpZ56COUlieU04iXCA__",
                description: "Polenta fingers, veal cheek, magic chili cured lemoncream, yellow laksa",
                iconMeaning: IconMeaning.SPICY,
                price: 98
            }
        ]
    },
    {
        title: "Onza",
        image: "https://s3-alpha-sig.figma.com/img/3364/2f99/35966d2dc88a312455bfcc2d806af889?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PxdaHK5BCZ5V9n5v5F8876slDkUXgiAyur4KDEfiMt-~q1EM9xoiUt0VoahBfS6II0Z5C4uWZjZ-F59MZyroJRYAcVprtCFvaY-swviEDrxpayRXhAXm6PSIt9zrXQNevxIMd4PR2wIDZyOWFrpiIV3m7H6gyN2bEkkR8FENDtYj9Y5lPcT7IMuGK5wYX4rYy-OODa82grnAh573PaHt4-8KIsKF-LdkTb4~6oVHx8Ts2cZwrK3wwNZ66vvyVleoB3wC81x8SucFnSrhyfnaTMWzX-1nTkwsQF~QEZnZTN~-thdS4DFcJHCm3FA6n-G6OYVx5Sumjie3HMTD6~A26w__",
        subtitle: "Yossi Shitrit",
        rating: 3,
        dishes: [
            {
                title: "Red Farm",
                image: "https://s3-alpha-sig.figma.com/img/a288/1b2f/ae8225cf3599f1c1030a2f0db612e225?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q54hdvZ-vMk1gZE0DeUigns8dsSuNwtCj15IpfQLSWMJa5HnSfUjiDuJmyjuVDoX2FqIrCFi92lB3CNXtUQu52AieiVQmDNPZ4Wu0qEOZBGTz7Co0v68FCYlK7tbKR6MZSnEpBaglAhZMrfc54jcR1ce5FbmclQex7DAG1LExy7hIgfSculkk-6v-BjOtbCeBm3v4-U~lOV~m~byBbmMlyLoEY0FcOWNQXnEA-pT1CDVrmveZ8jSmkM1ddj3aDFNz1-iInhqEFC-LGVJQXMczROaYFiE-Mk2~vx8L~zUVX1fZ9h-95CKAHYeSK4b7JMa2e0L6ULmrb15AYqYj4sxCg__",
                description: "Tofu, Spekkoek Peanuts, Spicy Manis, Pear Yakitori",
                iconMeaning: IconMeaning.VEGI,
                price: 98
            }
        ]
    },
    {
        title: "Kitchen Market",
        image: "https://s3-alpha-sig.figma.com/img/5209/515e/cfc01ace5fbccb9616c956c889eb5640?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SIujE3RDeC-ggk9QtKt2K6bymx2xiow2NW83NCKgIkkryJPne6FZPKZRnEITSBSvYODNgHpto0gcHtbCE14ymHAjj~b7FdpAbb4cyZVcdddH4OmpC05kelj~gz0GLAHbtg8AOlwXiJlWqBVV~LqVLZxmkZ4SyPZAvS4ltGaCOzPNXBbPTLkrFdr99Q9RmmGXMi~ybZvcH-ps3EDbop~hACAEOhr7aboDqYOACkPrcOjXGnTr8Ew3ugFekb~uDIWnd7aXArtkZHBAIqC9UsNlLShrTG9mxuYeyENu-38TiT-zYQhRhbNsyQdWAtFbtt2Y3IVG0t2hQ4KnPm1SRO84Kw__",
        subtitle: "Yossi Shitrit",
        rating: 4,
        dishes: [
            {
                title: "Pad Ki Mao",
                image: "https://s3-alpha-sig.figma.com/img/2e67/b1b2/d214756da8c972edb6e1ab3b02c205d4?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cxImKvZg2RugsYxx0nHfc1UmhgbuPBpjtvdLumSEGXG2qV9pMO9v6lCk0zev9GvkMJAt38uxY1HeNtDiOtAU22L~Zpxhpy9ERUDBcUo9ip4UHzXogOXQarOPA8BN9qQ6G1gYY27T~O0NJnLxKn26JlGpprTisokFbns1pZH3-YfNu75geqGy2tP9gNNhyiBfCEkPnCuZMCLKYQ1xyZFw6wuviMooktk4~QNZtMMMWnT9AJzXDtNA9iRI9omYeFgUoZnLY6xBh195YCcjCeV1PXQHdfum7JP0KvL3FdQawetC6jIe78ocizBrnEr-EkmNmJNAAivhgj4HKrm~zCfzbQ__",
                description: "Shrimps, Glass Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic Chili Brown Coconut",
                iconMeaning: IconMeaning.SPICY,
                price: 88
            }
        ]
    },
    {
        title: "Mashya",
        image: "https://s3-alpha-sig.figma.com/img/3364/2f99/35966d2dc88a312455bfcc2d806af889?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PxdaHK5BCZ5V9n5v5F8876slDkUXgiAyur4KDEfiMt-~q1EM9xoiUt0VoahBfS6II0Z5C4uWZjZ-F59MZyroJRYAcVprtCFvaY-swviEDrxpayRXhAXm6PSIt9zrXQNevxIMd4PR2wIDZyOWFrpiIV3m7H6gyN2bEkkR8FENDtYj9Y5lPcT7IMuGK5wYX4rYy-OODa82grnAh573PaHt4-8KIsKF-LdkTb4~6oVHx8Ts2cZwrK3wwNZ66vvyVleoB3wC81x8SucFnSrhyfnaTMWzX-1nTkwsQF~QEZnZTN~-thdS4DFcJHCm3FA6n-G6OYVx5Sumjie3HMTD6~A26w__",
        subtitle: "Yossi Shitrit",
        rating: 3,
        dishes: [
            {
                title: "Pad Ki Mao",
                image: "https://s3-alpha-sig.figma.com/img/2e67/b1b2/d214756da8c972edb6e1ab3b02c205d4?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cxImKvZg2RugsYxx0nHfc1UmhgbuPBpjtvdLumSEGXG2qV9pMO9v6lCk0zev9GvkMJAt38uxY1HeNtDiOtAU22L~Zpxhpy9ERUDBcUo9ip4UHzXogOXQarOPA8BN9qQ6G1gYY27T~O0NJnLxKn26JlGpprTisokFbns1pZH3-YfNu75geqGy2tP9gNNhyiBfCEkPnCuZMCLKYQ1xyZFw6wuviMooktk4~QNZtMMMWnT9AJzXDtNA9iRI9omYeFgUoZnLY6xBh195YCcjCeV1PXQHdfum7JP0KvL3FdQawetC6jIe78ocizBrnEr-EkmNmJNAAivhgj4HKrm~zCfzbQ__",
                description: "Shrimps, Glass Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic Chili Brown Coconut",
                iconMeaning: IconMeaning.SPICY,
                price: 88
            }
        ]
    },
];

const chefOfTheWeekData =
{
    name: "Yossi Shitrit",
    description: 'Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav  Udim. Shitrit\'s creativity and culinary  acumen born of long experience  are expressed in the every detail of each and every dish.',
    image: "https://s3-alpha-sig.figma.com/img/ecf7/ed9d/73aeb3d11f70c9712f15e582329944ca?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ijgtitCdmoqQUxNZ6R9562aLhANo8NaAGeAzeOt7UNik4R5C2zJ7IvwNVBCJTBKQBL0t8X~xdr~zF8DAesg-6ktcudHTwnpMAacK9fX5L80JmTG6fbMyrumXSfePTY7m9RwJXH88HBmT4dh7uSenD2MF8oie2FY6hcNK6~~QpaqKslkHf7CFLYGg8qVGV2nYB~~d~FK6nBuvnjrCYDqXbpfNzgoczJT~EGsgSR8v-qycONUYRl6lnxbsr1nzIsD3BwqbOCdsdbwDxIeIeGf-1q6cxkZZqPsfhFCq0w6p5Yz5fwzF9kTALTgvYjbjy25E-sqqEA2K6dBNWX6lbzdVfQ__"
};


export async function loadData() {
    for (const restaurantData of restaurantsData) {
        await createRestaurant(
            restaurantData.title,
            restaurantData.image,
            restaurantData.subtitle,
            restaurantData.rating,
            restaurantData.dishes,
            chefOfTheWeekData
        );
    }
}
