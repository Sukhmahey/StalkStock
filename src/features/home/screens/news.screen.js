import React, { useContext, useState } from "react";
import { View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/SafeArea.component";
import { NewsContext } from "../../../services/news/news.context";

import NewsComponent from "../components/news.component";

const CarouselContainer = styled(View)`
  flex: 1;
  background-color: black;
  transform: scaleY(-1);‹
`;

const NewsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    news: { articles },
  } = useContext(NewsContext);

  return (
    <SafeArea style={{ marginTop: 20 }}>
      <CarouselContainer>
        {articles && (
          <Carousel
            layout={"stack"}
            data={articles.slice(0, 10)}
            vertical
            sliderHeight={300}
            itemHeight={Dimensions.get("window").height}
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
