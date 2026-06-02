export function generate_member(){
	const chars = "1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    const result = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return { 
      "name": "John_"+result,
      "age": 40,
      "friends": ["Jim", "Jack"],
      "pet": {
          "type": "dog",
          "name": "Buddy_" + result
      },
      "status": "active"
    }

}

// let arr = []
// // console.log(generate_member())
// // arr.push(generate_member())
// // console.log(arr)
// for(let i=0; i<3; i++){
// 	arr.push(generate_member());
// }
// console.log(arr);
