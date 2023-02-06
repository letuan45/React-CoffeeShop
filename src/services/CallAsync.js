export const callAsync = async (urls) => {
  try {
    const data = await Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    );

    return data;
  } catch (error) {
    alert(error);
    throw error;
  }
};

export const putAsync = async (urls, objArr) => {
  const arr = [...objArr];
  try {
    const data = await Promise.all(
      urls.map((url, idx) =>
        fetch(url, {
          method: "PUT",
          body: JSON.stringify(arr[idx]),
          headers: {
            "Content-Type": "application.json",
          },
        }).then((response) => response.json())
      )
    );

    return data;
  } catch (error) {
    alert(error);
    throw error;
  }
};
