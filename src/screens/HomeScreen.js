import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");

  const [categories, setCategories] = useState([]);

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      // console.log("Response: ", response.data);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const getRecipes = async (category = "beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      // console.log("Response: ", response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* Avatar And Bella Icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* Greetings and Punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.8) }} className="text-neutral-600">
            Hello, Meniper
          </Text>
          <View>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.8) }}
            >
              Make Your Own Food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            Stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search Any Recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.8) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.6)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>

        {/* Categories Section */}
        <View>
          {categories.length > 0 && (
            <Categories
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
              categories={categories}
            />
          )}
        </View>

        {/* Recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}
