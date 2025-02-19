// == vs === 차이

if ( 1 == "1" ){ // 자료형 고려 X
    console.log("같다.")
}else{
    console.log("같지 않다.")
}

if ( 1 === "1" ){    //자료형 까지 고려 X
    console.log("같다.")
}else{
    console.log("같지 않다.")
}