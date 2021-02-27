
const getData = () => {
    let loadingData = true
   
     let dataToReturn = {
     '2021-02-23': [{name: 'item 1 - any js object'}],
     '2021-02-21': [{name: 'item 2 - any js object', height: 80}],
     '2021-02-24': [],
     '2021-02-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
    }
    
    return [dataToReturn,false]
}



export default getData