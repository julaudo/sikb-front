(function(e){function n(n){for(var t,a,i=n[0],u=n[1],l=n[2],c=0,p=[];c<i.length;c++)a=i[c],o[a]&&p.push(o[a][0]),o[a]=0;for(t in u)Object.prototype.hasOwnProperty.call(u,t)&&(e[t]=u[t]);d&&d(n);while(p.length)p.shift()();return s.push.apply(s,l||[]),r()}function r(){for(var e,n=0;n<s.length;n++){for(var r=s[n],t=!0,i=1;i<r.length;i++){var u=r[i];0!==o[u]&&(t=!1)}t&&(s.splice(n--,1),e=a(a.s=r[0]))}return e}var t={},o={"app~9c3bf9d1":0},s=[];function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,n,r){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,n){if(1&n&&(e=a(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)a.d(r,t,function(n){return e[n]}.bind(null,t));return r},a.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="/sikb-front/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=n,i=i.slice();for(var l=0;l<i.length;l++)n(i[l]);var d=u;s.push([0,"chunk-vendors~2a42e354","chunk-vendors~fdc6512a","chunk-vendors~205977d4","chunk-vendors~7dcdd765","chunk-vendors~0605657e","chunk-vendors~d2305125","chunk-vendors~78eefc6e","chunk-vendors~dde583c9","chunk-vendors~793fb972","chunk-vendors~1655f327","chunk-vendors~74e9f0c9","chunk-vendors~9120e007","chunk-vendors~03631906","chunk-vendors~73f76323","app~d0ae3f07"]),r()})({3651:function(e,n,r){"use strict";r.d(n,"a",function(){return t}),r.d(n,"e",function(){return o}),r.d(n,"h",function(){return a}),r.d(n,"b",function(){return w}),r.d(n,"c",function(){return b}),r.d(n,"d",function(){return A}),r.d(n,"f",function(){return v}),r.d(n,"g",function(){return E}),r.d(n,"i",function(){return _});var t,o,s,a,i=r("0b16"),u=r("bc3a"),l=r.n(u),d=r("3c60");function c(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),t.forEach(function(n){p(e,n,r[n])})}return e}function p(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}(function(e){e["TOCOMPLETE"]="TO_COMPLETE",e["SUBMITTED"]="SUBMITTED",e["VALIDATED"]="VALIDATED"})(t||(t={})),function(e){e["USERREAD"]="USER_READ",e["USERCREATE"]="USER_CREATE",e["USERUPDATE"]="USER_UPDATE",e["USERDELETE"]="USER_DELETE",e["CLUBREAD"]="CLUB_READ",e["CLUBCREATE"]="CLUB_CREATE",e["CLUBUPDATE"]="CLUB_UPDATE",e["CLUBDELETE"]="CLUB_DELETE",e["AFFILIATIONREAD"]="AFFILIATION_READ",e["AFFILIATIONCREATE"]="AFFILIATION_CREATE",e["AFFILIATIONUPDATE"]="AFFILIATION_UPDATE",e["AFFILIATIONDELETE"]="AFFILIATION_DELETE",e["AFFILIATIONVALIDATE"]="AFFILIATION_VALIDATE",e["AFFILIATIONREJECT"]="AFFILIATION_REJECT",e["PERSONREAD"]="PERSON_READ",e["PERSONCREATE"]="PERSON_CREATE",e["PERSONUPDATE"]="PERSON_UPDATE",e["PERSONDELETE"]="PERSON_DELETE",e["SEASONREAD"]="SEASON_READ",e["SEASONCREATE"]="SEASON_CREATE",e["SEASONUPDATE"]="SEASON_UPDATE",e["SEASONDELETE"]="SEASON_DELETE"}(o||(o={})),function(e){e["PLAYER"]="PLAYER",e["COACH"]="COACH",e["ASSISTANT"]="ASSISTANT"}(s||(s={})),function(e){e["MALE"]="MALE",e["FEMALE"]="FEMALE"}(a||(a={}));const h=function(e){return{createAffiliation(n,r,t,o,s={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling createAffiliation.");if(null===r||void 0===r)throw new d["c"]("clubId","Required parameter clubId was null or undefined when calling createAffiliation.");if(null===t||void 0===t)throw new d["c"]("seasonId","Required parameter seasonId was null or undefined when calling createAffiliation.");if(null===o||void 0===o)throw new d["c"]("AffiliationForCreation","Required parameter AffiliationForCreation was null or undefined when calling createAffiliation.");const a="/clubs/{clubId}/seasons/{seasonId}/affiliations".replace("{clubId}",encodeURIComponent(String(r))).replace("{seasonId}",encodeURIComponent(String(t))),u=i["parse"](a,!0);let l;e&&(l=e.baseOptions);const p=c({method:"POST"},l,s),h={},f={};e&&(e.username||e.password)&&(h["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(h["access_token"]=String(n)),h["Content-Type"]="application/json",u.query=c({},u.query,f,s.query),delete u.search,p.headers=c({},h,s.headers);const w=!0;return p.data=w?JSON.stringify(void 0!==o?o:{}):o||"",{url:i["format"](u),options:p}},deleteAffiliation(n,r,t,o={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling deleteAffiliation.");if(null===r||void 0===r)throw new d["c"]("clubId","Required parameter clubId was null or undefined when calling deleteAffiliation.");if(null===t||void 0===t)throw new d["c"]("seasonId","Required parameter seasonId was null or undefined when calling deleteAffiliation.");const s="/clubs/{clubId}/seasons/{seasonId}/affiliations".replace("{clubId}",encodeURIComponent(String(r))).replace("{seasonId}",encodeURIComponent(String(t))),a=i["parse"](s,!0);let u;e&&(u=e.baseOptions);const l=c({method:"DELETE"},u,o),p={},h={};return e&&(e.username||e.password)&&(p["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(p["access_token"]=String(n)),a.query=c({},a.query,h,o.query),delete a.search,l.headers=c({},p,o.headers),{url:i["format"](a),options:l}},findAllClubAffiliations(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling findAllClubAffiliations.");if(null===r||void 0===r)throw new d["c"]("clubId","Required parameter clubId was null or undefined when calling findAllClubAffiliations.");const o="/clubs/{clubId}/affiliations".replace("{clubId}",encodeURIComponent(String(r))),s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"GET"},a,t),l={},p={};return e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers),{url:i["format"](s),options:u}},getAffiliation(n,r,t,o={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling getAffiliation.");if(null===r||void 0===r)throw new d["c"]("clubId","Required parameter clubId was null or undefined when calling getAffiliation.");if(null===t||void 0===t)throw new d["c"]("seasonId","Required parameter seasonId was null or undefined when calling getAffiliation.");const s="/clubs/{clubId}/seasons/{seasonId}/affiliations".replace("{clubId}",encodeURIComponent(String(r))).replace("{seasonId}",encodeURIComponent(String(t))),a=i["parse"](s,!0);let u;e&&(u=e.baseOptions);const l=c({method:"GET"},u,o),p={},h={};return e&&(e.username||e.password)&&(p["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(p["access_token"]=String(n)),a.query=c({},a.query,h,o.query),delete a.search,l.headers=c({},p,o.headers),{url:i["format"](a),options:l}},updateAffiliation(n,r,t,o,s={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling updateAffiliation.");if(null===r||void 0===r)throw new d["c"]("clubId","Required parameter clubId was null or undefined when calling updateAffiliation.");if(null===t||void 0===t)throw new d["c"]("seasonId","Required parameter seasonId was null or undefined when calling updateAffiliation.");if(null===o||void 0===o)throw new d["c"]("AffiliationForUpdate","Required parameter AffiliationForUpdate was null or undefined when calling updateAffiliation.");const a="/clubs/{clubId}/seasons/{seasonId}/affiliations".replace("{clubId}",encodeURIComponent(String(r))).replace("{seasonId}",encodeURIComponent(String(t))),u=i["parse"](a,!0);let l;e&&(l=e.baseOptions);const p=c({method:"PUT"},l,s),h={},f={};e&&(e.username||e.password)&&(h["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(h["access_token"]=String(n)),h["Content-Type"]="application/json",u.query=c({},u.query,f,s.query),delete u.search,p.headers=c({},h,s.headers);const w=!0;return p.data=w?JSON.stringify(void 0!==o?o:{}):o||"",{url:i["format"](u),options:p}}}},f=function(e){return{createAffiliation(n,r,t,o,s){const a=h(e).createAffiliation(n,r,t,o,s);return(e=l.a,n=d["a"])=>{const r=c({},a.options,{url:n+a.url});return e.request(r)}},deleteAffiliation(n,r,t,o){const s=h(e).deleteAffiliation(n,r,t,o);return(e=l.a,n=d["a"])=>{const r=c({},s.options,{url:n+s.url});return e.request(r)}},findAllClubAffiliations(n,r,t){const o=h(e).findAllClubAffiliations(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},getAffiliation(n,r,t,o){const s=h(e).getAffiliation(n,r,t,o);return(e=l.a,n=d["a"])=>{const r=c({},s.options,{url:n+s.url});return e.request(r)}},updateAffiliation(n,r,t,o,s){const a=h(e).updateAffiliation(n,r,t,o,s);return(e=l.a,n=d["a"])=>{const r=c({},a.options,{url:n+a.url});return e.request(r)}}}};class w extends d["b"]{createAffiliation(e,n,r,t,o){return f(this.configuration).createAffiliation(e,n,r,t,o)(this.axios,this.basePath)}deleteAffiliation(e,n,r,t){return f(this.configuration).deleteAffiliation(e,n,r,t)(this.axios,this.basePath)}findAllClubAffiliations(e,n,r){return f(this.configuration).findAllClubAffiliations(e,n,r)(this.axios,this.basePath)}getAffiliation(e,n,r,t){return f(this.configuration).getAffiliation(e,n,r,t)(this.axios,this.basePath)}updateAffiliation(e,n,r,t,o){return f(this.configuration).updateAffiliation(e,n,r,t,o)(this.axios,this.basePath)}}const m=function(e){return{createClub(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling createClub.");if(null===r||void 0===r)throw new d["c"]("ClubForCreation","Required parameter ClubForCreation was null or undefined when calling createClub.");const o="/clubs",s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"POST"},a,t),l={},p={};e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),l["Content-Type"]="application/json",s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers);const h=!0;return u.data=h?JSON.stringify(void 0!==r?r:{}):r||"",{url:i["format"](s),options:u}},deleteClub(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling deleteClub.");if(null===r||void 0===r)throw new d["c"]("clubId","Required parameter clubId was null or undefined when calling deleteClub.");const o="/clubs/{clubId}".replace("{clubId}",encodeURIComponent(String(r))),s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"DELETE"},a,t),l={},p={};return e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers),{url:i["format"](s),options:u}},findClubs(n,r={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling findClubs.");const t="/clubs",o=i["parse"](t,!0);let s;e&&(s=e.baseOptions);const a=c({method:"GET"},s,r),u={},l={};return e&&(e.username||e.password)&&(u["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(u["access_token"]=String(n)),o.query=c({},o.query,l,r.query),delete o.search,a.headers=c({},u,r.headers),{url:i["format"](o),options:a}},getClubById(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling getClubById.");if(null===r||void 0===r)throw new d["c"]("clubId","Required parameter clubId was null or undefined when calling getClubById.");const o="/clubs/{clubId}".replace("{clubId}",encodeURIComponent(String(r))),s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"GET"},a,t),l={},p={};return e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers),{url:i["format"](s),options:u}},updateClub(n,r,t,o={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling updateClub.");if(null===r||void 0===r)throw new d["c"]("clubId","Required parameter clubId was null or undefined when calling updateClub.");if(null===t||void 0===t)throw new d["c"]("ClubForUpdate","Required parameter ClubForUpdate was null or undefined when calling updateClub.");const s="/clubs/{clubId}".replace("{clubId}",encodeURIComponent(String(r))),a=i["parse"](s,!0);let u;e&&(u=e.baseOptions);const l=c({method:"PUT"},u,o),p={},h={};e&&(e.username||e.password)&&(p["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(p["access_token"]=String(n)),p["Content-Type"]="application/json",a.query=c({},a.query,h,o.query),delete a.search,l.headers=c({},p,o.headers);const f=!0;return l.data=f?JSON.stringify(void 0!==t?t:{}):t||"",{url:i["format"](a),options:l}},uploadLogo(n,r,t,o={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling uploadLogo.");if(null===r||void 0===r)throw new d["c"]("clubId","Required parameter clubId was null or undefined when calling uploadLogo.");if(null===t||void 0===t)throw new d["c"]("logoFileName","Required parameter logoFileName was null or undefined when calling uploadLogo.");const s="/clubs/{clubId}/logo".replace("{clubId}",encodeURIComponent(String(r))),a=i["parse"](s,!0);let u;e&&(u=e.baseOptions);const l=c({method:"POST"},u,o),p={},h={},f=new FormData;return e&&(e.username||e.password)&&(p["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(p["access_token"]=String(n)),void 0!==t&&f.append("logoFileName",t),a.query=c({},a.query,h,o.query),delete a.search,l.headers=c({},p,o.headers),l.data=f,{url:i["format"](a),options:l}}}},g=function(e){return{createClub(n,r,t){const o=m(e).createClub(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},deleteClub(n,r,t){const o=m(e).deleteClub(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},findClubs(n,r){const t=m(e).findClubs(n,r);return(e=l.a,n=d["a"])=>{const r=c({},t.options,{url:n+t.url});return e.request(r)}},getClubById(n,r,t){const o=m(e).getClubById(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},updateClub(n,r,t,o){const s=m(e).updateClub(n,r,t,o);return(e=l.a,n=d["a"])=>{const r=c({},s.options,{url:n+s.url});return e.request(r)}},uploadLogo(n,r,t,o){const s=m(e).uploadLogo(n,r,t,o);return(e=l.a,n=d["a"])=>{const r=c({},s.options,{url:n+s.url});return e.request(r)}}}};class b extends d["b"]{createClub(e,n,r){return g(this.configuration).createClub(e,n,r)(this.axios,this.basePath)}deleteClub(e,n,r){return g(this.configuration).deleteClub(e,n,r)(this.axios,this.basePath)}findClubs(e,n){return g(this.configuration).findClubs(e,n)(this.axios,this.basePath)}getClubById(e,n,r){return g(this.configuration).getClubById(e,n,r)(this.axios,this.basePath)}updateClub(e,n,r,t){return g(this.configuration).updateClub(e,n,r,t)(this.axios,this.basePath)}uploadLogo(e,n,r,t){return g(this.configuration).uploadLogo(e,n,r,t)(this.axios,this.basePath)}}const q=function(e){return{createSeason(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling createSeason.");if(null===r||void 0===r)throw new d["c"]("SeasonForCreation","Required parameter SeasonForCreation was null or undefined when calling createSeason.");const o="/seasons",s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"POST"},a,t),l={},p={};e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),l["Content-Type"]="application/json",s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers);const h=!0;return u.data=h?JSON.stringify(void 0!==r?r:{}):r||"",{url:i["format"](s),options:u}},deleteSeason(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling deleteSeason.");if(null===r||void 0===r)throw new d["c"]("seasonId","Required parameter seasonId was null or undefined when calling deleteSeason.");const o="/seasons/{seasonId}".replace("{seasonId}",encodeURIComponent(String(r))),s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"DELETE"},a,t),l={},p={};return e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers),{url:i["format"](s),options:u}},findFormationTypes(n,r={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling findFormationTypes.");const t="/formationTypes",o=i["parse"](t,!0);let s;e&&(s=e.baseOptions);const a=c({method:"GET"},s,r),u={},l={};return e&&(e.username||e.password)&&(u["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(u["access_token"]=String(n)),o.query=c({},o.query,l,r.query),delete o.search,a.headers=c({},u,r.headers),{url:i["format"](o),options:a}},findLicenceTypes(n,r={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling findLicenceTypes.");const t="/licenceTypes",o=i["parse"](t,!0);let s;e&&(s=e.baseOptions);const a=c({method:"GET"},s,r),u={},l={};return e&&(e.username||e.password)&&(u["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(u["access_token"]=String(n)),o.query=c({},o.query,l,r.query),delete o.search,a.headers=c({},u,r.headers),{url:i["format"](o),options:a}},findProfileTypes(n,r={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling findProfileTypes.");const t="/profileTypes",o=i["parse"](t,!0);let s;e&&(s=e.baseOptions);const a=c({method:"GET"},s,r),u={},l={};return e&&(e.username||e.password)&&(u["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(u["access_token"]=String(n)),o.query=c({},o.query,l,r.query),delete o.search,a.headers=c({},u,r.headers),{url:i["format"](o),options:a}},findSeasons(n,r={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling findSeasons.");const t="/seasons",o=i["parse"](t,!0);let s;e&&(s=e.baseOptions);const a=c({method:"GET"},s,r),u={},l={};return e&&(e.username||e.password)&&(u["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(u["access_token"]=String(n)),o.query=c({},o.query,l,r.query),delete o.search,a.headers=c({},u,r.headers),{url:i["format"](o),options:a}},updateSeason(n,r,t,o={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling updateSeason.");if(null===r||void 0===r)throw new d["c"]("seasonId","Required parameter seasonId was null or undefined when calling updateSeason.");if(null===t||void 0===t)throw new d["c"]("SeasonForUpdate","Required parameter SeasonForUpdate was null or undefined when calling updateSeason.");const s="/seasons/{seasonId}".replace("{seasonId}",encodeURIComponent(String(r))),a=i["parse"](s,!0);let u;e&&(u=e.baseOptions);const l=c({method:"PUT"},u,o),p={},h={};e&&(e.username||e.password)&&(p["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(p["access_token"]=String(n)),p["Content-Type"]="application/json",a.query=c({},a.query,h,o.query),delete a.search,l.headers=c({},p,o.headers);const f=!0;return l.data=f?JSON.stringify(void 0!==t?t:{}):t||"",{url:i["format"](a),options:l}}}},y=function(e){return{createSeason(n,r,t){const o=q(e).createSeason(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},deleteSeason(n,r,t){const o=q(e).deleteSeason(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},findFormationTypes(n,r){const t=q(e).findFormationTypes(n,r);return(e=l.a,n=d["a"])=>{const r=c({},t.options,{url:n+t.url});return e.request(r)}},findLicenceTypes(n,r){const t=q(e).findLicenceTypes(n,r);return(e=l.a,n=d["a"])=>{const r=c({},t.options,{url:n+t.url});return e.request(r)}},findProfileTypes(n,r){const t=q(e).findProfileTypes(n,r);return(e=l.a,n=d["a"])=>{const r=c({},t.options,{url:n+t.url});return e.request(r)}},findSeasons(n,r){const t=q(e).findSeasons(n,r);return(e=l.a,n=d["a"])=>{const r=c({},t.options,{url:n+t.url});return e.request(r)}},updateSeason(n,r,t,o){const s=q(e).updateSeason(n,r,t,o);return(e=l.a,n=d["a"])=>{const r=c({},s.options,{url:n+s.url});return e.request(r)}}}};class A extends d["b"]{createSeason(e,n,r){return y(this.configuration).createSeason(e,n,r)(this.axios,this.basePath)}deleteSeason(e,n,r){return y(this.configuration).deleteSeason(e,n,r)(this.axios,this.basePath)}findFormationTypes(e,n){return y(this.configuration).findFormationTypes(e,n)(this.axios,this.basePath)}findLicenceTypes(e,n){return y(this.configuration).findLicenceTypes(e,n)(this.axios,this.basePath)}findProfileTypes(e,n){return y(this.configuration).findProfileTypes(e,n)(this.axios,this.basePath)}findSeasons(e,n){return y(this.configuration).findSeasons(e,n)(this.axios,this.basePath)}updateSeason(e,n,r,t){return y(this.configuration).updateSeason(e,n,r,t)(this.axios,this.basePath)}}const I=function(e){return{userConfirm(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("confirmToken","Required parameter confirmToken was null or undefined when calling userConfirm.");if(null===r||void 0===r)throw new d["c"]("ConfirmPassword","Required parameter ConfirmPassword was null or undefined when calling userConfirm.");const o="/users/confirm",s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"POST"},a,t),l={},p={};e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&(p["confirmToken"]=n),l["Content-Type"]="application/json",s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers);const h=!0;return u.data=h?JSON.stringify(void 0!==r?r:{}):r||"",{url:i["format"](s),options:u}},userLogin(n,r={}){if(null===n||void 0===n)throw new d["c"]("Credentials","Required parameter Credentials was null or undefined when calling userLogin.");const t="/users/login",o=i["parse"](t,!0);let s;e&&(s=e.baseOptions);const a=c({method:"POST"},s,r),u={},l={};e&&(e.username||e.password)&&(u["Authorization"]="Basic "+btoa(e.username+":"+e.password)),u["Content-Type"]="application/json",o.query=c({},o.query,l,r.query),delete o.search,a.headers=c({},u,r.headers);const p=!0;return a.data=p?JSON.stringify(void 0!==n?n:{}):n||"",{url:i["format"](o),options:a}},userLogout(n,r={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling userLogout.");const t="/users/logout",o=i["parse"](t,!0);let s;e&&(s=e.baseOptions);const a=c({method:"GET"},s,r),u={},l={};return e&&(e.username||e.password)&&(u["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(u["access_token"]=String(n)),o.query=c({},o.query,l,r.query),delete o.search,a.headers=c({},u,r.headers),{url:i["format"](o),options:a}},userReset(n,r={}){if(null===n||void 0===n)throw new d["c"]("Reset","Required parameter Reset was null or undefined when calling userReset.");const t="/users/reset",o=i["parse"](t,!0);let s;e&&(s=e.baseOptions);const a=c({method:"POST"},s,r),u={},l={};e&&(e.username||e.password)&&(u["Authorization"]="Basic "+btoa(e.username+":"+e.password)),u["Content-Type"]="application/json",o.query=c({},o.query,l,r.query),delete o.search,a.headers=c({},u,r.headers);const p=!0;return a.data=p?JSON.stringify(void 0!==n?n:{}):n||"",{url:i["format"](o),options:a}},userUpdatePassword(n,r,t,o={}){if(null===n||void 0===n)throw new d["c"]("UpdatePassword","Required parameter UpdatePassword was null or undefined when calling userUpdatePassword.");const s="/users/updatePassword",a=i["parse"](s,!0);let u;e&&(u=e.baseOptions);const l=c({method:"POST"},u,o),p={},h={};e&&(e.username||e.password)&&(p["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==t&&(h["resetToken"]=t),void 0!==r&&null!==r&&(p["access_token"]=String(r)),p["Content-Type"]="application/json",a.query=c({},a.query,h,o.query),delete a.search,l.headers=c({},p,o.headers);const f=!0;return l.data=f?JSON.stringify(void 0!==n?n:{}):n||"",{url:i["format"](a),options:l}}}},S=function(e){return{userConfirm(n,r,t){const o=I(e).userConfirm(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},userLogin(n,r){const t=I(e).userLogin(n,r);return(e=l.a,n=d["a"])=>{const r=c({},t.options,{url:n+t.url});return e.request(r)}},userLogout(n,r){const t=I(e).userLogout(n,r);return(e=l.a,n=d["a"])=>{const r=c({},t.options,{url:n+t.url});return e.request(r)}},userReset(n,r){const t=I(e).userReset(n,r);return(e=l.a,n=d["a"])=>{const r=c({},t.options,{url:n+t.url});return e.request(r)}},userUpdatePassword(n,r,t,o){const s=I(e).userUpdatePassword(n,r,t,o);return(e=l.a,n=d["a"])=>{const r=c({},s.options,{url:n+s.url});return e.request(r)}}}};class v extends d["b"]{userConfirm(e,n,r){return S(this.configuration).userConfirm(e,n,r)(this.axios,this.basePath)}userLogin(e,n){return S(this.configuration).userLogin(e,n)(this.axios,this.basePath)}userLogout(e,n){return S(this.configuration).userLogout(e,n)(this.axios,this.basePath)}userReset(e,n){return S(this.configuration).userReset(e,n)(this.axios,this.basePath)}userUpdatePassword(e,n,r,t){return S(this.configuration).userUpdatePassword(e,n,r,t)(this.axios,this.basePath)}}const P=function(e){return{createPerson(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling createPerson.");if(null===r||void 0===r)throw new d["c"]("PersonForCreation","Required parameter PersonForCreation was null or undefined when calling createPerson.");const o="/persons",s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"POST"},a,t),l={},p={};e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),l["Content-Type"]="application/json",s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers);const h=!0;return u.data=h?JSON.stringify(void 0!==r?r:{}):r||"",{url:i["format"](s),options:u}},deletePerson(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling deletePerson.");if(null===r||void 0===r)throw new d["c"]("personId","Required parameter personId was null or undefined when calling deletePerson.");const o="/persons/{personId}".replace("{personId}",encodeURIComponent(String(r))),s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"DELETE"},a,t),l={},p={};return e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers),{url:i["format"](s),options:u}},findPersons(n,r={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling findPersons.");const t="/persons",o=i["parse"](t,!0);let s;e&&(s=e.baseOptions);const a=c({method:"GET"},s,r),u={},l={};return e&&(e.username||e.password)&&(u["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(u["access_token"]=String(n)),o.query=c({},o.query,l,r.query),delete o.search,a.headers=c({},u,r.headers),{url:i["format"](o),options:a}},getPerson(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling getPerson.");if(null===r||void 0===r)throw new d["c"]("personId","Required parameter personId was null or undefined when calling getPerson.");const o="/persons/{personId}".replace("{personId}",encodeURIComponent(String(r))),s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"GET"},a,t),l={},p={};return e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers),{url:i["format"](s),options:u}},updatePerson(n,r,t,o={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling updatePerson.");if(null===r||void 0===r)throw new d["c"]("personId","Required parameter personId was null or undefined when calling updatePerson.");if(null===t||void 0===t)throw new d["c"]("PersonForUpdate","Required parameter PersonForUpdate was null or undefined when calling updatePerson.");const s="/persons/{personId}".replace("{personId}",encodeURIComponent(String(r))),a=i["parse"](s,!0);let u;e&&(u=e.baseOptions);const l=c({method:"PUT"},u,o),p={},h={};e&&(e.username||e.password)&&(p["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(p["access_token"]=String(n)),p["Content-Type"]="application/json",a.query=c({},a.query,h,o.query),delete a.search,l.headers=c({},p,o.headers);const f=!0;return l.data=f?JSON.stringify(void 0!==t?t:{}):t||"",{url:i["format"](a),options:l}},uploadMedicalCertificate(n,r,t,o,s={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling uploadMedicalCertificate.");if(null===r||void 0===r)throw new d["c"]("personId","Required parameter personId was null or undefined when calling uploadMedicalCertificate.");if(null===t||void 0===t)throw new d["c"]("medicalCertificateFileName","Required parameter medicalCertificateFileName was null or undefined when calling uploadMedicalCertificate.");if(null===o||void 0===o)throw new d["c"]("medicalCertificateBeginValidityDate","Required parameter medicalCertificateBeginValidityDate was null or undefined when calling uploadMedicalCertificate.");const a="/persons/{personId}/medicalCertificate".replace("{personId}",encodeURIComponent(String(r))),u=i["parse"](a,!0);let l;e&&(l=e.baseOptions);const p=c({method:"POST"},l,s),h={},f={},w=new FormData;return e&&(e.username||e.password)&&(h["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(h["access_token"]=String(n)),void 0!==t&&w.append("medicalCertificateFileName",t),void 0!==o&&w.append("medicalCertificateBeginValidityDate",o),u.query=c({},u.query,f,s.query),delete u.search,p.headers=c({},h,s.headers),p.data=w,{url:i["format"](u),options:p}},uploadPhoto(n,r,t,o={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling uploadPhoto.");if(null===r||void 0===r)throw new d["c"]("personId","Required parameter personId was null or undefined when calling uploadPhoto.");if(null===t||void 0===t)throw new d["c"]("photoFileName","Required parameter photoFileName was null or undefined when calling uploadPhoto.");const s="/persons/{personId}/photo".replace("{personId}",encodeURIComponent(String(r))),a=i["parse"](s,!0);let u;e&&(u=e.baseOptions);const l=c({method:"POST"},u,o),p={},h={},f=new FormData;return e&&(e.username||e.password)&&(p["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(p["access_token"]=String(n)),void 0!==t&&f.append("photoFileName",t),a.query=c({},a.query,h,o.query),delete a.search,l.headers=c({},p,o.headers),l.data=f,{url:i["format"](a),options:l}}}},C=function(e){return{createPerson(n,r,t){const o=P(e).createPerson(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},deletePerson(n,r,t){const o=P(e).deletePerson(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},findPersons(n,r){const t=P(e).findPersons(n,r);return(e=l.a,n=d["a"])=>{const r=c({},t.options,{url:n+t.url});return e.request(r)}},getPerson(n,r,t){const o=P(e).getPerson(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},updatePerson(n,r,t,o){const s=P(e).updatePerson(n,r,t,o);return(e=l.a,n=d["a"])=>{const r=c({},s.options,{url:n+s.url});return e.request(r)}},uploadMedicalCertificate(n,r,t,o,s){const a=P(e).uploadMedicalCertificate(n,r,t,o,s);return(e=l.a,n=d["a"])=>{const r=c({},a.options,{url:n+a.url});return e.request(r)}},uploadPhoto(n,r,t,o){const s=P(e).uploadPhoto(n,r,t,o);return(e=l.a,n=d["a"])=>{const r=c({},s.options,{url:n+s.url});return e.request(r)}}}};class E extends d["b"]{createPerson(e,n,r){return C(this.configuration).createPerson(e,n,r)(this.axios,this.basePath)}deletePerson(e,n,r){return C(this.configuration).deletePerson(e,n,r)(this.axios,this.basePath)}findPersons(e,n){return C(this.configuration).findPersons(e,n)(this.axios,this.basePath)}getPerson(e,n,r){return C(this.configuration).getPerson(e,n,r)(this.axios,this.basePath)}updatePerson(e,n,r,t){return C(this.configuration).updatePerson(e,n,r,t)(this.axios,this.basePath)}uploadMedicalCertificate(e,n,r,t,o){return C(this.configuration).uploadMedicalCertificate(e,n,r,t,o)(this.axios,this.basePath)}uploadPhoto(e,n,r,t){return C(this.configuration).uploadPhoto(e,n,r,t)(this.axios,this.basePath)}}const R=function(e){return{createUser(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling createUser.");if(null===r||void 0===r)throw new d["c"]("UserForCreation","Required parameter UserForCreation was null or undefined when calling createUser.");const o="/users",s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"POST"},a,t),l={},p={};e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),l["Content-Type"]="application/json",s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers);const h=!0;return u.data=h?JSON.stringify(void 0!==r?r:{}):r||"",{url:i["format"](s),options:u}},deleteUser(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling deleteUser.");if(null===r||void 0===r)throw new d["c"]("userId","Required parameter userId was null or undefined when calling deleteUser.");const o="/users/{userId}".replace("{userId}",encodeURIComponent(String(r))),s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"DELETE"},a,t),l={},p={};return e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers),{url:i["format"](s),options:u}},findUsers(n,r={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling findUsers.");const t="/users",o=i["parse"](t,!0);let s;e&&(s=e.baseOptions);const a=c({method:"GET"},s,r),u={},l={};return e&&(e.username||e.password)&&(u["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(u["access_token"]=String(n)),o.query=c({},o.query,l,r.query),delete o.search,a.headers=c({},u,r.headers),{url:i["format"](o),options:a}},getUser(n,r,t={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling getUser.");if(null===r||void 0===r)throw new d["c"]("userId","Required parameter userId was null or undefined when calling getUser.");const o="/users/{userId}".replace("{userId}",encodeURIComponent(String(r))),s=i["parse"](o,!0);let a;e&&(a=e.baseOptions);const u=c({method:"GET"},a,t),l={},p={};return e&&(e.username||e.password)&&(l["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(l["access_token"]=String(n)),s.query=c({},s.query,p,t.query),delete s.search,u.headers=c({},l,t.headers),{url:i["format"](s),options:u}},updateUser(n,r,t,o={}){if(null===n||void 0===n)throw new d["c"]("access_token","Required parameter access_token was null or undefined when calling updateUser.");if(null===r||void 0===r)throw new d["c"]("userId","Required parameter userId was null or undefined when calling updateUser.");if(null===t||void 0===t)throw new d["c"]("UserForUpdate","Required parameter UserForUpdate was null or undefined when calling updateUser.");const s="/users/{userId}".replace("{userId}",encodeURIComponent(String(r))),a=i["parse"](s,!0);let u;e&&(u=e.baseOptions);const l=c({method:"PUT"},u,o),p={},h={};e&&(e.username||e.password)&&(p["Authorization"]="Basic "+btoa(e.username+":"+e.password)),void 0!==n&&null!==n&&(p["access_token"]=String(n)),p["Content-Type"]="application/json",a.query=c({},a.query,h,o.query),delete a.search,l.headers=c({},p,o.headers);const f=!0;return l.data=f?JSON.stringify(void 0!==t?t:{}):t||"",{url:i["format"](a),options:l}}}},T=function(e){return{createUser(n,r,t){const o=R(e).createUser(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},deleteUser(n,r,t){const o=R(e).deleteUser(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},findUsers(n,r){const t=R(e).findUsers(n,r);return(e=l.a,n=d["a"])=>{const r=c({},t.options,{url:n+t.url});return e.request(r)}},getUser(n,r,t){const o=R(e).getUser(n,r,t);return(e=l.a,n=d["a"])=>{const r=c({},o.options,{url:n+o.url});return e.request(r)}},updateUser(n,r,t,o){const s=R(e).updateUser(n,r,t,o);return(e=l.a,n=d["a"])=>{const r=c({},s.options,{url:n+s.url});return e.request(r)}}}};class _ extends d["b"]{createUser(e,n,r){return T(this.configuration).createUser(e,n,r)(this.axios,this.basePath)}deleteUser(e,n,r){return T(this.configuration).deleteUser(e,n,r)(this.axios,this.basePath)}findUsers(e,n){return T(this.configuration).findUsers(e,n)(this.axios,this.basePath)}getUser(e,n,r){return T(this.configuration).getUser(e,n,r)(this.axios,this.basePath)}updateUser(e,n,r,t){return T(this.configuration).updateUser(e,n,r,t)(this.axios,this.basePath)}}}});