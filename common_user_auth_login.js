function rememberPassword(){
	var e=document.getElementById("enableCookie").checked;
	if(e){
		CookieHelper.setCookie("enableCookie","true",365);
	}else{
		CookieHelper.setCookie("enableCookie","false",365);
	}
}

function codeInputOnmousedown(e){
	var t=document.getElementById(e);
	var n=document.getElementById("commonUsernameInputTip").value;
	if(t.value==n){
		t.value="";
	}
}
function codeInputOnblur(e){
	var t=document.getElementById(e);
	var n=document.getElementById("commonUsernameInputTip").value;
	if(t.value==""){
		t.value=n;
	}
}

function sumitAfterPorterAuthen(){
	$("kind").value="esaLoginSuccess";
	$("loginForm").action=$("loginActionName").value;$("loginForm").submit();
}
function keyLogin(e){
	e=e?e:window.event?window.event:"";
	var keyCode=e.keyCode?e.keyCode:e.which?e.which:e.charCode;
	switch(keyCode)
	{
		case 8:$("password").value='';break; //退格
		case 13: doLogin(); break; //回车
	}
}
function toFindPswPage(){
	document.loginForm.action="./passwordprotectionservlet";
	document.getElementById("kind").value="toFindPasswordPage";
	document.loginForm.submit();
}

function toFindPswPage() {
	document.loginForm.action = "./passwordprotectionservlet";
	document.getElementById('kind').value = "toFindPasswordPage";
	document.loginForm.submit();
}


function toRegisterNormalUserPage(){
	document.getElementById("loginForm").action="./userregisterservlet?portal=true";
	document.getElementById("kind").value="toRegisterNormalUserPage";
	document.getElementById("userId").value="";
	document.getElementById("password").value="";
	document.getElementById("loginForm").submit();
}
function textInputOnFocus(e,t){
	var e=document.getElementById(e);
	var n=document.getElementById("commonPwdInputTip").value;
	var t=document.getElementById(t);
	if(e.value!=n){
		return;
	}
	e.style.display="none";
	t.style.display="";
	t.value="";
	t.focus();
}
function textInputOnblur(e,t){
	var e=document.getElementById(e);
	var n=document.getElementById("commonPwdInputTip").value;
	var t=document.getElementById(t);
	if(t.value!=""){
		return;
	}
	t.style.display="none";
	e.style.display="";
	e.value=n;
}
function onEsaAuthenTypeChange(){
	if($("esaAuthenType").value=="tls"){
		$("login_box_username").style.display="none";
		$("login_box_password").style.display="none";
		$("remember_area_div").style.display="none";
	}else{
		$("login_box_username").style.display="block";
		$("login_box_password").style.display="block";
		$("remember_area_div").style.display="block";
	}
}
function doLogin(){
	var e=$("isSubmit").value;
	if(e==1){
		alert("认证请求已经提交, 请不要重复登录!");
		return;
	}
	login();
	$("isSubmit").value=1;
}
function encryptedPwd(password){
	var cookiePwd = document.getElementById("passwordInCookie").value;
	if(password.length > 255){
		return password;
	}
	var key ;  
	var exponent = document.getElementById("exponent").value;
	var module = document.getElementById("module").value;
	setMaxDigits(130);  
	key = new RSAKeyPair(exponent,"", module);
	return encryptedString(key, password);
}
function XmlReader(e){
	function t(t){
//		SmpAssert.notNull(t,"nodeName is null");
		var n=e.childNodes;
		for(var r=0;r<n.length;r++){
			var i=n[r];
			if(i.nodeName==t){
				return new XmlReader(i);
			}
		}
		return null;
	}
	function n(t){
//		SmpAssert.notNull(t,"nodeName is null");
		var n=[];
		var r=e.childNodes;
		for(var i=0;i<r.length;i++){
			var s=r[i];
			if(s.nodeName==t){
				n.push(XmlReader(s));
			}
		}
		return n;
	}
	function r(){
		var t="";
		if(e.text!=undefined){
			return e.text;
		}else{
			return e.textContent;
		}
	}
	if(e==null){
		throw"xml is null";
	}
	var e=e;
	this.getSingleChildNode=t;
	this.getText=r;
	this.getChildNodes=n;
}
function XmlWriter(e,t){
	function n(n){
//		SmpAssert.notNull(n,"nodeName is null");
		var r=e.createElement(n);
		t.appendChild(r);
		return new XmlWriter(e,r);
	}
	function r(n){
//		SmpAssert.notNull(n,"value is null");
		if(n==""){
			return;
		}
		var r=e.createCDATASection(n);
		t.appendChild(r);
	}
	function i(e){
//		SmpAssert.notNull(e,"value is null");
		if(e==""){
			return;
		}
		if(t.text!=undefined){
			t.text=e;
		}else{
			t.textContent=e;
		}
	}
//	SmpAssert.notNull(e,"document is null");
//	SmpAssert.notNull(t,"xmlNode is null");
	var e=e;
	var t=t;
	this.appendEmptyChildNode=n;
	this.setCDataText=r;
	this.setText=i;
}
var CookieHelper=new function(){
	function e(e){
		if(document.cookie.length>0){
			c_start=document.cookie.indexOf(e+"=");
			if(c_start!=-1){
				c_start=c_start+e.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if(c_end==-1)c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			}
		}
		return"";
	}
	function t(e,t,n){
		var r=new Date;
		r.setDate(r.getDate()+n);
		document.cookie=e+"="+escape(t)+(n==null?"":";expires="+r.toGMTString());
	}
	this.getCookie=e;
	this.setCookie=t;
};
$=function(e){
	return typeof e=="object"?e:document.getElementById(e);
};
var PortalActiveX=new function(){
	function o(){
		if(false==l()){
			return null;
		}
		return document.getElementById("portalObject");
	}
	function u(){
		try{
			return a();
		}
		catch(e){
			return false;
		}
	}
	function a(){
		var e=o().IsPortalInstall();
		var t=f(e);
		return t.returnValue;
	}
	function f(e){
		var t=XmlFactory.createXmlDocObj();
		t.loadXML(e);
		var n=new XmlReader(t);
		var r=n.getSingleChildNode("PortalReturn");
		var i=r.getSingleChildNode("ReturnVal");
		var s=i.getText();
		var o=r.getSingleChildNode("ErrorInfomation");
		var u=o.getText();
		var a={returnValue:s,errorInfomation:u};
		var f=r.getSingleChildNode("OtherData");
		if(f!=null){
			a["otherDataNode"]=f;
		}
		return a;
	}
	function l(){
		if(!!window.ActiveXObject||"ActiveXObject"in window){
			return true;
		}else{
			return false;
		}
	}
	function c(e,t){
//		SmpAssert.notNull(e,"paramXml is null");
//		SmpAssert.notNull(t,"onSyncAuthenComplete is null");
		if(false==a()){
			var n="PortalActiveX is not install success";
			alert(n);
			throw n;
		}
		h(t);
		var s=o().connect(e);
		if(i==s){
			return;
		}
		var u=f(s);
		if(r==u.returnValue){
			alert(u.errorInfomation);
		}
	}
	function h(e){
		for(var t=0;t<s.length;t++){
			var n=s[t];
			if(n==e){
				return;
			}
		}
		o().attachEvent("ConnectCompleted",e);
		s.push(e);
	}
	function p(e,t,n){
//		SmpAssert.notNull(e,"key is null");
//		SmpAssert.notNull(t,"value is null");
//		SmpAssert.notNull(n,"expireSeconds is null");
		o().saveInfo(t,n,e);
	}
	function d(e){
//		SmpAssert.notNull(e,"key is null");
		return o().readInfo(e);
	}
	function v(e){
//		SmpAssert.notNull(e,"key is null");
		o().saveInfo("",0,e);
	}
	function m(e){
		return t==e;
	}
	var e="CONNECT_UNKOWN";
	var t="CONNECTED_SUCCESS";
	var n="CONNECT_FAIL";
	var r="CALL_FAIL";
	var i="";
	var s=[];
	this.isInstallPortalClient=u;
	this.isBrowserSupportActiveX=l;
	this.saveCookie=p;
	this.readCookie=d;
	this.clearCookie=v;
	this.connect=c;
	this.resolveResultXml=f;
	this.isConnectSuccess=m;
};
var AuthenType=new function(){
	function n(){
		return e;
	}
	function r(){
		return t;
	}
	function i(t){
		if(e==t){
			return true;
		}
		return false;
	}
	function s(e){
		if(t==e){
			return true;
		}
		return false;
	}
	var e="pap";
	var t="tls";
	this.getPap=n;
	this.getTls=r;
	this.isPap=i;
	this.isTls=s};
	var PortalServerType=new function(){
		function t(){
			return e;
		}
		var e="smp";
		this.getSmp=t;
	};
	var PortalClientUtils=new function(){
		function n(){
			if(false==PortalActiveX.isBrowserSupportActiveX()){
				return false;
			}
			if(false==PortalActiveX.isInstallPortalClient()){
				return false;
			}
			return true;
		}
		function r(e){
//			SmpAssert.notNull(e,"sumitAfterPorterAuthen is null");
			t=e;
			var n=PortalClientXmlParamFactory.createAuthXmlParam();
			PortalActiveX.connect(n,i);
		}
		function i(e){
//			SmpAssert.notNull(e,"resultXml is null");
			var t=PortalActiveX.resolveResultXml(e);
			if(PortalActiveX.isConnectSuccess(t.returnValue)){
				s(t.errorInfomation,t.otherDataNode);
			}else{
				o(t.errorInfomation,t.otherDataNode);
			}
		}
		function s(e,n){
			if(e!=""){
				alert(e);
			}
			t();
		}
		function o(t,n){
			if(t==null){
				t=e;
			}
			alert(t);
			if(n!=null){
				var r=u(n);
				SecZoneListEventListener.refreshList(r.secZoneNameArray);
			}
		}
		function u(e){
//			SmpAssert.notNull(e,"otherDataNode is null");
			var t=e.getSingleChildNode("seczone_list");
			var n=t.getChildNodes("seczone");
			var r=[];
			for(var i=0;i<n.length;i++){
				var s=n[i];
				var o=s.getText();
				r.push(o);
			}
			var u={secZoneNameArray:r};
			return u;
		}
		var e="认证失败";
		var t=null;
		this.isAuthenByPortalClient=n;
		this.syncAuthen=r};
		var PortalClientXmlParamFactory=new function(){
			function e(){
				var e=XmlFactory.createXmlDocObj();
				var o=new XmlWriter(e,e);
				var u=o.appendEmptyChildNode("portal_param");
				t(u);
				n(u);
				r(u);
				i(u);
				s(u);
				return e.xml;
			}
			function t(e){
				var t=AuthenType.getPap();
				if($("esaAuthenType")!=null){
					t=$("esaAuthenType").value;
				}
				o(e,"auth_type",t);
				o(e,"portal_server_type",PortalServerType.getSmp());
			}
			function n(e){
				u(e,"username",$("userId").value);
				var t=$("password").value;
				var s=$("passwordInCookie").value;
				u(e,"password",t);
			    if(t == s){
			    	u(e,"isFromCookie","true");
				}
			}
			function r(e){
				o(e,"service_ip",$("sccpServerIp").value);
				o(e,"service_listen_port",$("sccpServerPort").value);
				o(e,"client_src_port",$("sccpClientPort").value);
				o(e,"sccp_iv_encrypt",$("sccpEncrytIV").value);
				o(e,"sccp_key_encrypt",$("sccpEncrytKey").value);
				o(e,"sccp_timestamp",$("sccpTimestamp").value);
			}
			function i(e){
				o(e,"user_ip",$("userIp").value);
				o(e,"user_mac",$("mac").value);
				u(e,"ssid",$("ssid").value);
				o(e,"ap_mac",$("apmac").value);
				o(e,"vlan_id",$("vid").value);
				o(e,"nas_ip",$("nasIp").value);
				o(e,"nas_port",$("port").value);
			}
			function s(e){
				u(e,"url",$("urlBeforeLogon").value);
				if($("secZoneName")!=null){
					o(e,"seczone",$("secZoneName").value);
				}
			}
			function o(e,t,n){
				if(n==null||n==""){
					return;
				}
				var r=e.appendEmptyChildNode(t);
				r.setText(n);
			}
			function u(e,t,n){
				if(n==null||n==""){
					return;
				}
				var r=e.appendEmptyChildNode(t);
				r.setCDataText(n);
			}
			this.createAuthXmlParam=e;
		};
		var XmlFactory=new function(){
			function e(){
				try{
					xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				}catch(e){
					try{
						xmlDoc=document.implementation.createDocument("","",null);
					}catch(e){
						alert(e.message);
					}
				}
				try{
					xmlDoc.async=false;
					return xmlDoc;
				}catch(e){
					alert(e.message);
				}
			}
			this.createXmlDocObj=e;
		};
		
		(function () {
		    var dialogId = "dialog-1322343284892348293492";
		    var shieldId = "shield-1586452159856655565655";
		    function createBtn(btn, name) {
		        var _btn = document.createElement("span");
		        _btn.innerHTML = name;
		        var callback;
		        if (typeof btn === "function") {
		            callback = function () {
		                btn();
		                closeDialog();
		            }
		        } else {
		            callback = closeDialog;
		            if (btn !== true) {
		                _btn.style.display = "none";
		            }
		        }
		        _btn.onclick = callback;
		        _btn.style.Height = "34px";
		        _btn.style.minwidth = "80px";
		        _btn.style.color = "#ffffff";
		        _btn.style.fontSize = "18px";
				_btn.style.fontWeight="bold";
				_btn.style.padding="5px 10px";
		        _btn.style.background="url(./portal/images/btnH34_green_disclaimer.png) repeat-x";
		        return _btn;
		    }
		    function createShield() {
		    	var _shield = document.createElement("div");
		    	_shield.id = shieldId;
		    	_shield.style.position = "absolute";
		    	_shield.style.left = "0px";
		    	_shield.style.top = "0px";
		    	_shield.style.width = "100%";
		    	_shield.style.height = "100%";
		    	_shield.style.background = "#617276";
		    	_shield.style.textAlign = "center";
		    	_shield.style.zIndex = "10000";
		    	_shield.style.filter = "alpha(opacity=80)";
		    	_shield.style.opacity = 0.8;
		    	return _shield;
		    }
		    function createBtns() {
		        var btns = document.createElement("div");
		        btns.style.height = "34px";
		        btns.style.lineHeight = "34px";
				btns.style.marginTop = "30px";
				btns.style.marginBotton = "30px";
		        btns.style.textAlign = "center";
		        for (var i = 0; i < arguments.length; i++) {
		            var btn = arguments[i];
		            btns.appendChild(createBtn(btn.callback, btn.name));
		        }
		        return btns;
		    }
		    function createMessage(msg, width, height) {
		        var _msg = document.createElement("div");
		        _msg.innerHTML = msg;
		        _msg.style.marginTop = "25px";
				_msg.style.marginLeft = (width*0.06 ) +"px";
		        _msg.style.height =(height-175)+"px";
		        _msg.style.width = "90%";
		        _msg.style.textAlign = "left";
		        _msg.style.color = "#706f6f";
				_msg.style.lineHeight = "180%";
				_msg.style.fontFamily="SimSun";
				_msg.style.fontSize="12px";
				_msg.style.overflow="auto";
				_msg.style.whiteSpace="pre-wrap";
				_msg.style.wordWrap="break-word";
		        _msg.style.wordBreak = "break-all";
		        return _msg;
		    }
		    function createTitle(titleName) {
		        var title = document.createElement("div");
		        title.style.height = "46px";
		        title.style.width = "100%";
		        title.style.lineHeight = "46px";
		        title.style.color = "#FFF";
				title.style.background="url(./portal/images/captionbg_disclaimer.png) repeat-x";
				title.style.textAlign = "center";
				title.style.overflow="hidden";
				title.style.fontFamily="Microsoft YaHei";
				title.style.fontSize="22px";
				title.style.fontWeight="bold";
		        title.innerHTML = titleName;
		        return title;
		    }
		    function dialog(title, msg, btnName, w, h, ok) {
		        closeDialog();
				
		        if (ok == undefined) {
		            ok = true;
		        }
		        if (msg == undefined) {
		            msg = "";
		        }
		        _dialog = document.createElement("div");
				_dialog.style.height = h+"px";
		        _dialog.style.width = w+"px";
		        _dialog.appendChild(createTitle(title));
		        _dialog.appendChild(createMessage(msg,w,h));
		        _dialog.appendChild(createBtns(typeof ok === "object" ? ok : { callback: ok, name: btnName}));
		        document.body.appendChild(_dialog);
		        document.body.appendChild(createShield());
		        _dialog.id = dialogId;
		        _dialog.style.position = "absolute";
		        if(document.body.offsetWidth <= 0){
		        	_dialog.style.left = "150px";
		        }else{
		        	_dialog.style.left = (document.body.offsetWidth - _dialog.offsetWidth) / 2 + 8 + "px";
		        }
		        
		        _dialog.style.top = (document.body.offsetTop + 8 ) + "px";
		        _dialog.style.backgroundColor = "#FFFFFF";
		        _dialog.style.overflow = "hidden";
		        _dialog.style.zIndex = "10001";
		        return _dialog;
		    }
		    function closeDialog() {
		        var _dialog = document.getElementById(dialogId);
		        var _shield = document.getElementById(shieldId);
		        if (_dialog) {
		            document.body.removeChild(_dialog);
		        }
		        if(_shield) {
		        	 document.body.removeChild(_shield);
		        }
		    }
		    function disclaimerDialog(title, msg, btn, width, height, ok) {
		        return dialog(title, msg, btn, width, height, ok);
		    }
		    window.dialog = dialog;
		    window.closeDialog = closeDialog;
		    window.disclaimerDialog = disclaimerDialog;
		})();
	
		// BarrettMu, a class for performing Barrett modular reduction computations in JavaScript.
		// Requires BigInt.js.
		function BarrettMu(m)
		{
			this.modulus = biCopy(m);
			this.k = biHighIndex(this.modulus) + 1;
			var b2k = new BigInt();
			b2k.digits[2 * this.k] = 1; // b2k = b^(2k)
			this.mu = biDivide(b2k, this.modulus);
			this.bkplus1 = new BigInt();
			this.bkplus1.digits[this.k + 1] = 1; // bkplus1 = b^(k+1)
			this.modulo = BarrettMu_modulo;
			this.multiplyMod = BarrettMu_multiplyMod;
			this.powMod = BarrettMu_powMod;
		}

		function BarrettMu_modulo(x)
		{
			var q1 = biDivideByRadixPower(x, this.k - 1);
			var q2 = biMultiply(q1, this.mu);
			var q3 = biDivideByRadixPower(q2, this.k + 1);
			var r1 = biModuloByRadixPower(x, this.k + 1);
			var r2term = biMultiply(q3, this.modulus);
			var r2 = biModuloByRadixPower(r2term, this.k + 1);
			var r = biSubtract(r1, r2);
			if (r.isNeg) {
				r = biAdd(r, this.bkplus1);
			}
			var rgtem = biCompare(r, this.modulus) >= 0;
			while (rgtem) {
				r = biSubtract(r, this.modulus);
				rgtem = biCompare(r, this.modulus) >= 0;
			}
			return r;
		}

		function BarrettMu_multiplyMod(x, y)
		{
			var xy = biMultiply(x, y);
			return this.modulo(xy);
		}

		function BarrettMu_powMod(x, y)
		{
			var result = new BigInt();
			result.digits[0] = 1;
			var a = x;
			var k = y;
			while (true) {
				if ((k.digits[0] & 1) != 0) result = this.multiplyMod(result, a);
				k = biShiftRight(k, 1);
				if (k.digits[0] == 0 && biHighIndex(k) == 0) break;
				a = this.multiplyMod(a, a);
			}
			return result;
		}

		// BigInt, a suite of routines for performing multiple-precision arithmetic in JavaScript.
		var biRadixBase = 2;
		var biRadixBits = 16;
		var bitsPerDigit = biRadixBits;
		var biRadix = 1 << 16; // = 2^16 = 65536
		var biHalfRadix = biRadix >>> 1;
		var biRadixSquared = biRadix * biRadix;
		var maxDigitVal = biRadix - 1;
		var maxInteger = 9999999999999998; 
 
		var maxDigits;
		var ZERO_ARRAY;
		var bigZero, bigOne;

		function setMaxDigits(value)
		{
			maxDigits = value;
			ZERO_ARRAY = new Array(maxDigits);
			for (var iza = 0; iza < ZERO_ARRAY.length; iza++) ZERO_ARRAY[iza] = 0;
			bigZero = new BigInt();
			bigOne = new BigInt();
			bigOne.digits[0] = 1;
		}

		setMaxDigits(20);

		// The maximum number of digits in base 10 you can convert to an
		// integer without JavaScript throwing up on you.
		var dpl10 = 15;
		// lr10 = 10 ^ dpl10
		var lr10 = biFromNumber(1000000000000000);

		function BigInt(flag)
		{
			if (typeof flag == "boolean" && flag == true) {
				this.digits = null;
			}
			else {
				this.digits = ZERO_ARRAY.slice(0);
			}
			this.isNeg = false;
		}

		function biFromDecimal(s)
		{
			var isNeg = s.charAt(0) == '-';
			var i = isNeg ? 1 : 0;
			var result;
			// Skip leading zeros.
			while (i < s.length && s.charAt(i) == '0') ++i;
			if (i == s.length) {
				result = new BigInt();
			}
			else {
				var digitCount = s.length - i;
				var fgl = digitCount % dpl10;
				if (fgl == 0) fgl = dpl10;
				result = biFromNumber(Number(s.substr(i, fgl)));
				i += fgl;
				while (i < s.length) {
					result = biAdd(biMultiply(result, lr10),
					               biFromNumber(Number(s.substr(i, dpl10))));
					i += dpl10;
				}
				result.isNeg = isNeg;
			}
			return result;
		}

		function biCopy(bi)
		{
			var result = new BigInt(true);
			result.digits = bi.digits.slice(0);
			result.isNeg = bi.isNeg;
			return result;
		}

		function biFromNumber(i)
		{
			var result = new BigInt();
			result.isNeg = i < 0;
			i = Math.abs(i);
			var j = 0;
			while (i > 0) {
				result.digits[j++] = i & maxDigitVal;
				i = Math.floor(i / biRadix);
			}
			return result;
		}

		function reverseStr(s)
		{
			var result = "";
			for (var i = s.length - 1; i > -1; --i) {
				result += s.charAt(i);
			}
			return result;
		}

		var hexatrigesimalToChar = new Array(
		 '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
		 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
		 'u', 'v', 'w', 'x', 'y', 'z'
		);

		function biToString(x, radix)
			// 2 <= radix <= 36
		{
			var b = new BigInt();
			b.digits[0] = radix;
			var qr = biDivideModulo(x, b);
			var result = hexatrigesimalToChar[qr[1].digits[0]];
			while (biCompare(qr[0], bigZero) == 1) {
				qr = biDivideModulo(qr[0], b);
				digit = qr[1].digits[0];
				result += hexatrigesimalToChar[qr[1].digits[0]];
			}
			return (x.isNeg ? "-" : "") + reverseStr(result);
		}

		function biToDecimal(x)
		{
			var b = new BigInt();
			b.digits[0] = 10;
			var qr = biDivideModulo(x, b);
			var result = String(qr[1].digits[0]);
			while (biCompare(qr[0], bigZero) == 1) {
				qr = biDivideModulo(qr[0], b);
				result += String(qr[1].digits[0]);
			}
			return (x.isNeg ? "-" : "") + reverseStr(result);
		}

		var hexToChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		                          'a', 'b', 'c', 'd', 'e', 'f');

		function digitToHex(n)
		{
			var mask = 0xf;
			var result = "";
			for (i = 0; i < 4; ++i) {
				result += hexToChar[n & mask];
				n >>>= 4;
			}
			return reverseStr(result);
		}

		function biToHex(x)
		{
			var result = "";
			var n = biHighIndex(x);
			for (var i = biHighIndex(x); i > -1; --i) {
				result += digitToHex(x.digits[i]);
			}
			return result;
		}

		function charToHex(c)
		{
			var ZERO = 48;
			var NINE = ZERO + 9;
			var littleA = 97;
			var littleZ = littleA + 25;
			var bigA = 65;
			var bigZ = 65 + 25;
			var result;

			if (c >= ZERO && c <= NINE) {
				result = c - ZERO;
			} else if (c >= bigA && c <= bigZ) {
				result = 10 + c - bigA;
			} else if (c >= littleA && c <= littleZ) {
				result = 10 + c - littleA;
			} else {
				result = 0;
			}
			return result;
		}

		function hexToDigit(s)
		{
			var result = 0;
			var sl = Math.min(s.length, 4);
			for (var i = 0; i < sl; ++i) {
				result <<= 4;
				result |= charToHex(s.charCodeAt(i))
			}
			return result;
		}

		function biFromHex(s)
		{
			var result = new BigInt();
			var sl = s.length;
			for (var i = sl, j = 0; i > 0; i -= 4, ++j) {
				result.digits[j] = hexToDigit(s.substr(Math.max(i - 4, 0), Math.min(i, 4)));
			}
			return result;
		}

		function biFromString(s, radix)
		{
			var isNeg = s.charAt(0) == '-';
			var istop = isNeg ? 1 : 0;
			var result = new BigInt();
			var place = new BigInt();
			place.digits[0] = 1; // radix^0
			for (var i = s.length - 1; i >= istop; i--) {
				var c = s.charCodeAt(i);
				var digit = charToHex(c);
				var biDigit = biMultiplyDigit(place, digit);
				result = biAdd(result, biDigit);
				place = biMultiplyDigit(place, radix);
			}
			result.isNeg = isNeg;
			return result;
		}

		function biDump(b)
		{
			return (b.isNeg ? "-" : "") + b.digits.join(" ");
		}

		function biAdd(x, y)
		{
			var result;

			if (x.isNeg != y.isNeg) {
				y.isNeg = !y.isNeg;
				result = biSubtract(x, y);
				y.isNeg = !y.isNeg;
			}
			else {
				result = new BigInt();
				var c = 0;
				var n;
				for (var i = 0; i < x.digits.length; ++i) {
					n = x.digits[i] + y.digits[i] + c;
					result.digits[i] = n % biRadix;
					c = Number(n >= biRadix);
				}
				result.isNeg = x.isNeg;
			}
			return result;
		}

		function biSubtract(x, y)
		{
			var result;
			if (x.isNeg != y.isNeg) {
				y.isNeg = !y.isNeg;
				result = biAdd(x, y);
				y.isNeg = !y.isNeg;
			} else {
				result = new BigInt();
				var n, c;
				c = 0;
				for (var i = 0; i < x.digits.length; ++i) {
					n = x.digits[i] - y.digits[i] + c;
					result.digits[i] = n % biRadix;
					// Stupid non-conforming modulus operation.
					if (result.digits[i] < 0) result.digits[i] += biRadix;
					c = 0 - Number(n < 0);
				}
				// Fix up the negative sign, if any.
				if (c == -1) {
					c = 0;
					for (var i = 0; i < x.digits.length; ++i) {
						n = 0 - result.digits[i] + c;
						result.digits[i] = n % biRadix;
						// Stupid non-conforming modulus operation.
						if (result.digits[i] < 0) result.digits[i] += biRadix;
						c = 0 - Number(n < 0);
					}
					// Result is opposite sign of arguments.
					result.isNeg = !x.isNeg;
				} else {
					// Result is same sign.
					result.isNeg = x.isNeg;
				}
			}
			return result;
		}


		function biHighIndex(x)
		{
			var result = x.digits.length - 1;
			while (result > 0 && x.digits[result] == 0) --result;
			return result;
		}

		function biNumBits(x)
		{
			var n = biHighIndex(x);
			var d = x.digits[n];
			var m = (n + 1) * bitsPerDigit;
			var result;
			for (result = m; result > m - bitsPerDigit; --result) {
				if ((d & 0x8000) != 0) break;
				d <<= 1;
			}
			return result;
		}

		function biMultiply(x, y)
		{
			var result = new BigInt();
			var c;
			var n = biHighIndex(x);
			var t = biHighIndex(y);
			var u, uv, k;

			for (var i = 0; i <= t; ++i) {
				c = 0;
				k = i;
				for (j = 0; j <= n; ++j, ++k) {
					uv = result.digits[k] + x.digits[j] * y.digits[i] + c;
					result.digits[k] = uv & maxDigitVal;
					c = uv >>> biRadixBits;
					//c = Math.floor(uv / biRadix);
				}
				result.digits[i + n + 1] = c;
			}
			// Someone give me a logical xor, please.
			result.isNeg = x.isNeg != y.isNeg;
			return result;
		}

		function biMultiplyDigit(x, y)
		{
			var n, c, uv;

			result = new BigInt();
			n = biHighIndex(x);
			c = 0;
			for (var j = 0; j <= n; ++j) {
				uv = result.digits[j] + x.digits[j] * y + c;
				result.digits[j] = uv & maxDigitVal;
				c = uv >>> biRadixBits;
				//c = Math.floor(uv / biRadix);
			}
			result.digits[1 + n] = c;
			return result;
		}

		function arrayCopy(src, srcStart, dest, destStart, n)
		{
			var m = Math.min(srcStart + n, src.length);
			for (var i = srcStart, j = destStart; i < m; ++i, ++j) {
				dest[j] = src[i];
			}
		}

		var highBitMasks = new Array(0x0000, 0x8000, 0xC000, 0xE000, 0xF000, 0xF800,
		                             0xFC00, 0xFE00, 0xFF00, 0xFF80, 0xFFC0, 0xFFE0,
		                             0xFFF0, 0xFFF8, 0xFFFC, 0xFFFE, 0xFFFF);

		function biShiftLeft(x, n)
		{
			var digitCount = Math.floor(n / bitsPerDigit);
			var result = new BigInt();
			arrayCopy(x.digits, 0, result.digits, digitCount,
			          result.digits.length - digitCount);
			var bits = n % bitsPerDigit;
			var rightBits = bitsPerDigit - bits;
			for (var i = result.digits.length - 1, i1 = i - 1; i > 0; --i, --i1) {
				result.digits[i] = ((result.digits[i] << bits) & maxDigitVal) |
				                   ((result.digits[i1] & highBitMasks[bits]) >>>
				                    (rightBits));
			}
			result.digits[0] = ((result.digits[i] << bits) & maxDigitVal);
			result.isNeg = x.isNeg;
			return result;
		}

		var lowBitMasks = new Array(0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
		                            0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
		                            0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF);

		function biShiftRight(x, n)
		{
			var digitCount = Math.floor(n / bitsPerDigit);
			var result = new BigInt();
			arrayCopy(x.digits, digitCount, result.digits, 0,
			          x.digits.length - digitCount);
			var bits = n % bitsPerDigit;
			var leftBits = bitsPerDigit - bits;
			for (var i = 0, i1 = i + 1; i < result.digits.length - 1; ++i, ++i1) {
				result.digits[i] = (result.digits[i] >>> bits) |
				                   ((result.digits[i1] & lowBitMasks[bits]) << leftBits);
			}
			result.digits[result.digits.length - 1] >>>= bits;
			result.isNeg = x.isNeg;
			return result;
		}

		function biMultiplyByRadixPower(x, n)
		{
			var result = new BigInt();
			arrayCopy(x.digits, 0, result.digits, n, result.digits.length - n);
			return result;
		}

		function biDivideByRadixPower(x, n)
		{
			var result = new BigInt();
			arrayCopy(x.digits, n, result.digits, 0, result.digits.length - n);
			return result;
		}

		function biModuloByRadixPower(x, n)
		{
			var result = new BigInt();
			arrayCopy(x.digits, 0, result.digits, 0, n);
			return result;
		}

		function biCompare(x, y)
		{
			if (x.isNeg != y.isNeg) {
				return 1 - 2 * Number(x.isNeg);
			}
			for (var i = x.digits.length - 1; i >= 0; --i) {
				if (x.digits[i] != y.digits[i]) {
					if (x.isNeg) {
						return 1 - 2 * Number(x.digits[i] > y.digits[i]);
					} else {
						return 1 - 2 * Number(x.digits[i] < y.digits[i]);
					}
				}
			}
			return 0;
		}

		function biDivideModulo(x, y)
		{
			var nb = biNumBits(x);
			var tb = biNumBits(y);
			var origYIsNeg = y.isNeg;
			var q, r;
			if (nb < tb) {
				// |x| < |y|
				if (x.isNeg) {
					q = biCopy(bigOne);
					q.isNeg = !y.isNeg;
					x.isNeg = false;
					y.isNeg = false;
					r = biSubtract(y, x);
					// Restore signs, 'cause they're references.
					x.isNeg = true;
					y.isNeg = origYIsNeg;
				} else {
					q = new BigInt();
					r = biCopy(x);
				}
				return new Array(q, r);
			}

			q = new BigInt();
			r = x;

			// Normalize Y.
			var t = Math.ceil(tb / bitsPerDigit) - 1;
			var lambda = 0;
			while (y.digits[t] < biHalfRadix) {
				y = biShiftLeft(y, 1);
				++lambda;
				++tb;
				t = Math.ceil(tb / bitsPerDigit) - 1;
			}
			// Shift r over to keep the quotient constant. We'll shift the
			// remainder back at the end.
			r = biShiftLeft(r, lambda);
			nb += lambda; // Update the bit count for x.
			var n = Math.ceil(nb / bitsPerDigit) - 1;

			var b = biMultiplyByRadixPower(y, n - t);
			while (biCompare(r, b) != -1) {
				++q.digits[n - t];
				r = biSubtract(r, b);
			}
			for (var i = n; i > t; --i) {
		    var ri = (i >= r.digits.length) ? 0 : r.digits[i];
		    var ri1 = (i - 1 >= r.digits.length) ? 0 : r.digits[i - 1];
		    var ri2 = (i - 2 >= r.digits.length) ? 0 : r.digits[i - 2];
		    var yt = (t >= y.digits.length) ? 0 : y.digits[t];
		    var yt1 = (t - 1 >= y.digits.length) ? 0 : y.digits[t - 1];
				if (ri == yt) {
					q.digits[i - t - 1] = maxDigitVal;
				} else {
					q.digits[i - t - 1] = Math.floor((ri * biRadix + ri1) / yt);
				}

				var c1 = q.digits[i - t - 1] * ((yt * biRadix) + yt1);
				var c2 = (ri * biRadixSquared) + ((ri1 * biRadix) + ri2);
				while (c1 > c2) {
					--q.digits[i - t - 1];
					c1 = q.digits[i - t - 1] * ((yt * biRadix) | yt1);
					c2 = (ri * biRadix * biRadix) + ((ri1 * biRadix) + ri2);
				}

				b = biMultiplyByRadixPower(y, i - t - 1);
				r = biSubtract(r, biMultiplyDigit(b, q.digits[i - t - 1]));
				if (r.isNeg) {
					r = biAdd(r, b);
					--q.digits[i - t - 1];
				}
			}
			r = biShiftRight(r, lambda);
			// Fiddle with the signs and stuff to make sure that 0 <= r < y.
			q.isNeg = x.isNeg != origYIsNeg;
			if (x.isNeg) {
				if (origYIsNeg) {
					q = biAdd(q, bigOne);
				} else {
					q = biSubtract(q, bigOne);
				}
				y = biShiftRight(y, lambda);
				r = biSubtract(y, r);
			}
			// Check for the unbelievably stupid degenerate case of r == -0.
			if (r.digits[0] == 0 && biHighIndex(r) == 0) r.isNeg = false;

			return new Array(q, r);
		}

		function biDivide(x, y)
		{
			return biDivideModulo(x, y)[0];
		}

		function biModulo(x, y)
		{
			return biDivideModulo(x, y)[1];
		}

		function biMultiplyMod(x, y, m)
		{
			return biModulo(biMultiply(x, y), m);
		}

		function biPow(x, y)
		{
			var result = bigOne;
			var a = x;
			while (true) {
				if ((y & 1) != 0) result = biMultiply(result, a);
				y >>= 1;
				if (y == 0) break;
				a = biMultiply(a, a);
			}
			return result;
		}

		function biPowMod(x, y, m)
		{
			var result = bigOne;
			var a = x;
			var k = y;
			while (true) {
				if ((k.digits[0] & 1) != 0) result = biMultiplyMod(result, a, m);
				k = biShiftRight(k, 1);
				if (k.digits[0] == 0 && biHighIndex(k) == 0) break;
				a = biMultiplyMod(a, a, m);
			}
			return result;
		}

		// RSA, a suite of routines for performing RSA public-key computations in JavaScript.
		// Requires BigInt.js and Barrett.js.
		function RSAKeyPair(encryptionExponent, decryptionExponent, modulus)
		{
			this.e = biFromHex(encryptionExponent);
			this.d = biFromHex(decryptionExponent);
			this.m = biFromHex(modulus);
			this.chunkSize = 2 * biHighIndex(this.m);
			this.radix = 16;
			this.barrett = new BarrettMu(this.m);
		}

		function twoDigit(n)
		{
			return (n < 10 ? "0" : "") + String(n);
		}

		function encryptedString(key, s)
		{
			var a = new Array();
			var sl = s.length;
			var i = 0;
			while (i < sl) {
				a[i] = s.charCodeAt(i);
				i++;
			}

			while (a.length % key.chunkSize != 0) {
				a[i++] = 0;
			}

			var al = a.length;
			var result = "";
			var j, k, block;
			for (i = 0; i < al; i += key.chunkSize) {
				block = new BigInt();
				j = 0;
				for (k = i; k < i + key.chunkSize; ++j) {
					block.digits[j] = a[k++];
					block.digits[j] += a[k++] << 8;
				}
				var crypt = key.barrett.powMod(block, key.e);
				var text = key.radix == 16 ? biToHex(crypt) : biToString(crypt, key.radix);
				result += text + " ";
			}
			return result.substring(0, result.length - 1); // Remove last space.
		}

		function decryptedString(key, s)
		{
			var blocks = s.split(" ");
			var result = "";
			var i, j, block;
			for (i = 0; i < blocks.length; ++i) {
				var bi;
				if (key.radix == 16) {
					bi = biFromHex(blocks[i]);
				}
				else {
					bi = biFromString(blocks[i], key.radix);
				}
				block = key.barrett.powMod(bi, key.d);
				for (j = 0; j <= biHighIndex(block); ++j) {
					result += String.fromCharCode(block.digits[j] & 255,
					                              block.digits[j] >> 8);
				}
			}
			// Remove trailing null, if any.
			if (result.charCodeAt(result.length - 1) == 0) {
				result = result.substring(0, result.length - 1);
			}
			return result;
		}
