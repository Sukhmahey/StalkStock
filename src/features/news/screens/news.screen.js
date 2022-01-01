import React, { useContext, useState } from "react";
import { View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/SafeArea.component";
import { NewsContext } from "../../../services/news/news.context";

import NewsComponent from "../components/news.component";
import NewsSearch from "../components/newsSearch.component";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;

const CarouselContainer = styled(View)`
  flex: 1;
  background-color: black;
`;

const NewsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    news: { articles },
  } = useContext(NewsContext);

  return (
    <SafeArea>
      <NewsSearch />
      <CarouselContainer>
        {articles && (
          <Carousel
            layout={"stack"}
            layoutCardOffset={18}
            data={articles.slice(0, 30)}
            sliderHeight={300}
            itemHeight={ITEM_HEIGHT - 80 - 80}
            vertical
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item, index }) => (
              <NewsComponent item={item} index={index} />
            )}
          />
        )}
      </CarouselContainer>
    </SafeArea>
  );
};

export default NewsScreen;
