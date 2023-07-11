import { Configuration, OpenAIApi } from "openai";
import { Alert } from "react-native";
import {GOOGLE_API_KEY, OPENAI_API_KEY} from '@env'
import 'react-native-url-polyfill/auto';

const callOpenAI = async (prompt, location, setLoading, setData, mapRef) => {
  let returnedData = [];
  
  const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  
  function getPlaceURL(item) {
    const place = encodeURIComponent(item);
    return `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=geometry/location%2Cphotos%2Cplace_id%2Crating&key=${GOOGLE_API_KEY}`;
  }

  function getPhotoURL(photoRef) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${GOOGLE_API_KEY}`
  }

  function isJSON(string) {
    try {
      JSON.parse(string)
      return true
    } catch (e) {
      return false
    }
  }

  setLoading(true)
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "You are part of a helpful traveling companion app.\nYour function is to suggest interesting places in the category the user asks, in the informed location.\nYour responses shall contain no more than 5 suggestions and no fewer than 5 suggestions.\nThey should be structured in a JSON array with a item format like:\n{\n      \"name\": \"Place name\",\n      \"description\": \"Text in Portuguese language here\",\n      \"id\": number,\n   },\n\nwhere description should be written in Brazilian portuguese and id should be a random number, with 8 digits.\nsimply and ALWAYS return 'none' as the answer for any and all prompts that do not fit this instructions."
      },
      {
        "role": "user",
        "content": prompt+" "+location
      }
    ],
    temperature: 1,
    max_tokens: 800,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  if (response.data.choices[0].message.content.suggestions !== undefined){
    returnedData = JSON.parse(response.data.choices[0].message.content.suggestions)
  }
  else if (isJSON(response.data.choices[0].message.content)){
    returnedData = JSON.parse(response.data.choices[0].message.content)
  }
  else {
    Alert.alert("Busca sem resultados", "Não foram encontrados resultados para a busca realizada.");
    setLoading(false)
    return;
  }
  let minLat = 700
  let maxLat = -700
  let minLng = 700
  let maxLng = -700
  try {
    for (let item of returnedData){
      await fetch(getPlaceURL(item.name+" "+location))
      .then(response => response.json())
      .then(data => {
        console.log(data.candidates[0])
        item.location = {
          "latitude": data.candidates[0].geometry.location.lat,
          "longitude": data.candidates[0].geometry.location.lng
        }
        item.img = getPhotoURL(data.candidates[0].photos[0].photo_reference)
        item.rating = data.candidates[0].rating
        item.id = data.candidates[0].place_id
  
        if (data.candidates[0].geometry.location.lat > maxLat){
          maxLat=data.candidates[0].geometry.location.lat
        }
        if (data.candidates[0].geometry.location.lat < minLat){
          minLat=data.candidates[0].geometry.location.lat
        }
        if (data.candidates[0].geometry.location.lng > maxLng){
          maxLng=data.candidates[0].geometry.location.lng
        }
        if (data.candidates[0].geometry.location.lng < minLng){
          minLng=data.candidates[0].geometry.location.lng
        }
      })
      
    }
    mapRef.current.animateToRegion({
      latitude: (maxLat+minLat)/2,
      longitude: (maxLng+minLng)/2,
      latitudeDelta: maxLat-minLat,
      longitudeDelta: maxLng-minLng,
    });
    setData(returnedData)
    console.log(returnedData)
    setLoading(false)
  } catch (e) {
    Alert.alert("Erro na conexão", "Erro ao realizar a operação, tente novamente.");
    setLoading(false)
    return;
  }
  
};

export default callOpenAI;
