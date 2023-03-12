import React from "react";
import { View, StyleSheet, Image } from "react-native";


function DiaDescanso() {

  return (
    
<View style={styles.container}>
<Image
          style={{ width: 400, height: 350 }}
          source={{ uri: "https://scontent.ffdo5-1.fna.fbcdn.net/v/t1.6435-9/121519453_2849829985250303_7079366728416072285_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGa42BfLZXyEdMJ_Of3CqO9fGJXbe6uBH98Yldt7q4Ef2R7XAzSPpkTaWzQOZ0l-8I&_nc_ohc=X3Eb5YsAFZcAX95ysBc&_nc_ht=scontent.ffdo5-1.fna&oh=00_AfDh-Fq6E1vy0NvMyCfgvFvIDrJNgLyTEZ8xLJlV-x4HRA&oe=63B6B554" }}
        />
</View>
  );
}

export default DiaDescanso;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
