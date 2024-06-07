function getCookieValue(name) {
	// 현재 브라우저의 모든 쿠키를 문자열로 가져옴
	const cookies = document.cookie.split(';');
	
	// 각 쿠키를 순회하면서 name과 일치하는 쿠키를 찾음
	for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			
			// 쿠키의 이름과 값을 분리
			if (cookie.startsWith(name + '=')) {
					// '=' 이후의 부분을 반환 (쿠키의 값)
					return cookie.substring((name + '=').length);
			}
	}
	// 일치하는 쿠키가 없으면 null 반환
	return null;
}

export default getCookieValue;