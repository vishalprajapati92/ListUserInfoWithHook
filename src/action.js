export function getData() {
    return (dispatch) => {
        fetch('http://localhost:3001/getUsers',  
                {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                  },
                  body: JSON.stringify({query: "{getAllInfo {name{ firstName,lastName,middleName,prefix,nickName},Address{line1,line2,zipCode,city,state,country}friends,hobbies}}"})
                })
            .then(resp => resp.json())
            .then((resp) => {
                if(resp && resp.data && resp.data.getAllInfo){
                    const getAllUserInfo = resp.data.getAllInfo;
                    dispatch({
                        type: "GET_DATA",
                        data: getAllUserInfo
                    })
                }
            });
    }
}