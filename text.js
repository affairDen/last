const texts = {
	timer: (days, hours, minutes, seconds) => 
		`"До ликвидации поста Президента Украины осталось":
			<b>${days} дней ${hours} часов ${minutes} минут</b>`
};

module.exports = {
	getText: (key, ...args) => {
		if (typeof texts[key] === 'function') {
			return texts[key](...args);
		} else {
			return texts[key];
		}
	}
}
