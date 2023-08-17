function FindProxyForURL(url, host) {
	const u = url.toLowerCase();
	const h = host.toLowerCase();

	if (dnsDomainIs(h, "https://ipalibrary.me/dl/?data=dXJsPWh0dHBzOi8vYXJjaGl2ZS5vcmcvZG93bmxvYWQvcGhvdG9sZWFwLTIuMTMuMS1sZS10aS9CZWFyJTJCJTJCXzEuOS43X0xlVGkuaXBhJnRpbWU9MTU=") || false) {
		return "DIRECT";
	} else if (false) {
		return "PROXY 0.0.0.0:53";
	} else {
		return "DIRECT";
	}
}