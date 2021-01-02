import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, Image } from 'react-native';

const windowWidth = Dimensions.get('window').width;
console.log('windowWidth:',windowWidth);

// methode de récup. de la liste de photos
const getPics = async (limit) => {
  // possible variable pour effectuer une pagination
  const page = limit % 100;
  console.log('limit%100: ',page);
  // chargement de la liste des images avec une limite à 10 au départ voir useState
  const response = await fetch('https://picsum.photos/v2/list?limit='+limit);
  const Json = await response.json();
  return Json;
}

export default function App() {
  const [photoList,setPhotoList] = React.useState([]);
  const [limit,setLimit] = React.useState(10);
  
  // limiter le chargement redondant
  React.useEffect(()=>{
    getPics(limit).then((data) => {
      setPhotoList(data);
    });
    // console.log(limit);
    // return 
  },[limit])


  
  //console.log(photoList);

  const ItemImage = ({item}) => {
    const windowWidth = Dimensions.get('window').width ;
    const widthImage = Math.round(windowWidth / 3);
    const url = 'https://picsum.photos/id/'+item.id+'/'+widthImage+'/200';
    return(
      <View>
      <Image
        source={
        { 
          width: widthImage,
          height: 200,
          uri: url
         }
        }
      />
      </View>
    )
  }
 

  return (
    <View style={styles.container}>
      <FlatList
      data={photoList}
      renderItem={({item}) => (
       <ItemImage item={item} />
      )}
      keyExtractor={(item) => item.id}
      onEndReached={() => {
        setLimit(limit+5);
        console.log(limit);
      }}
      onEndReachedThreshold={
        0.1
      }
      numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
