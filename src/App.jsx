import { View, Text, StatusBar, Alert, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setISloading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  async function fetchJob(page) {
    setISloading(true);
    try {
      const response = await axios.get(
        `https://testapi.getlokalapp.com/common/jobs?page=${page}`
      );
      const data = await response.data;
      if (page === 1) {
        setJobs(data.results);
      } else {
        setJobs((prev) => [...prev, ...data.results]);
      }
    } catch (error) {
      Alert.alert(error.message);
      setError(error.message);
    } finally {
      setISloading(false);
    }
  }

  useEffect(() => {
    fetchJob(1);
  }, []);

  function handelLoadMore() {
    if (page < 4) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        fetchJob(newPage);
        return newPage;
      });
    }
  }

  if (isLoading) {
    return <Text> Loading... </Text>;
  }

  if (error) {
    <Text> {error} </Text>;
  }

  function RenderJobs({ jobs }) {
    return (
      <View style={styles.cart}>
        <Text style={styles.title}> {jobs?.title} </Text>
        <Text style={styles.text}>
          {" "}
          Place : {jobs?.primary_details?.Place}{" "}
        </Text>
        <Text style={styles.text}>
          Qualification : {jobs?.primary_details?.Qualification || "NaN"}
        </Text>
        <Text style={styles.text}>
          Salary :
          {jobs?.primary_details?.Salary || "Depends on experience/work"}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ margin: 10 }}>
      <StatusBar backgroundColor="#f00" barStyle={"light-content"} />
      <FlatList
        data={jobs}
        renderItem={({ item }) => <RenderJobs jobs={item} />}
        keyExtractor={(item) => item?.id?.toString()}
        ListEmptyComponent={<Text> Data not found! </Text>}
        onEndReached={handelLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<View style={{ paddingBottom: 20 }}></View>}
      />
      {console.log(jobs)}
    </View>
  );
}

const styles = StyleSheet.create({
  cart: {
    width: "100%",
    padding: 10,
    backgroundColor: "#ccc",
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});
