## qyjUtils
Some utility functions for cloud function develeopment of Tencent miniprogram.
给小程序云函数公用的一些工具方法

* [qyjUtils](#module_qyjUtils)
    * [.getDateByIndex(indexes)](#module_qyjUtils.getDateByIndex) ⇒ <code>Object</code>
    * [.getBirthdayDiff(birthdayStr, threshold, isLunar)](#module_qyjUtils.getBirthdayDiff) ⇒ <code>Number</code>
    * [.getDateDiff(date1, date2)](#module_qyjUtils.getDateDiff) ⇒ <code>Number</code>
    * [.getLunarDate(date)](#module_qyjUtils.getLunarDate) ⇒ <code>String</code>
    * [.todayFMD()](#module_qyjUtils.todayFMD) ⇒ <code>Object</code>
    * [.toDateStr(date)](#module_qyjUtils.toDateStr) ⇒ <code>String</code>
    * [.toFMD(dateStr)](#module_qyjUtils.toFMD) ⇒ <code>Object</code>
    * [.addNDay(date, n)](#module_qyjUtils.addNDay) ⇒ <code>Object</code>
    * [.substractNDay(date, n)](#module_qyjUtils.substractNDay) ⇒ <code>Object</code>
    * [.getLunarDay(date)](#module_qyjUtils.getLunarDay) ⇒ <code>String</code>

<a name="module_qyjUtils.getDateByIndex"></a>

### qyjUtils.getDateByIndex(indexes) ⇒ <code>Object</code>
根据小程序生日picker组件生成的index，返回实际的日期

**Kind**: static method of [<code>qyjUtils</code>](#module_qyjUtils)  
**Returns**: <code>Object</code> - {isLunar, date}  

| Param | Type | Description |
| --- | --- | --- |
| indexes | <code>Array</code> | 生日picker组件保存的index值数组。比如：[1,2,3] 农历 3-4 |

<a name="module_qyjUtils.getBirthdayDiff"></a>

### qyjUtils.getBirthdayDiff(birthdayStr, threshold, isLunar) ⇒ <code>Number</code>
获取离生日 date 相差几天，支持农历。返回值为整数。

**Kind**: static method of [<code>qyjUtils</code>](#module_qyjUtils)  
**Returns**: <code>Number</code> - 生日未过且离${threshold}天以内返回原值，否则返回-1  

| Param | Type | Description |
| --- | --- | --- |
| birthdayStr | <code>String</code> | 日期字符串，比如：'5-3' |
| threshold | <code>Number</code> | 最大差值的阈值，比如传入 7，那么相差7天以上的话就返回-1 |
| isLunar | <code>Boolean</code> | 日期是公历还是农历，默认公历 |

<a name="module_qyjUtils.getDateDiff"></a>

### qyjUtils.getDateDiff(date1, date2) ⇒ <code>Number</code>
获取两个date差几天。

**Kind**: static method of [<code>qyjUtils</code>](#module_qyjUtils)  
**Returns**: <code>Number</code> - 默认排序规则，date1小，date2大，返回正数。反之返回负数。  

| Param | Type |
| --- | --- |
| date1 | <code>Object</code> | 
| date2 | <code>Object</code> | 

<a name="module_qyjUtils.getLunarDate"></a>

### qyjUtils.getLunarDate(date) ⇒ <code>String</code>
获取某一天的农历日期。返回值为日期字符串

**Kind**: static method of [<code>qyjUtils</code>](#module_qyjUtils)  
**Returns**: <code>String</code> - 农历日期字符串  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>String</code> | 公历日期字符串，比如：'2022-5-3' |

<a name="module_qyjUtils.todayFMD"></a>

### qyjUtils.todayFMD() ⇒ <code>Object</code>
获取当日的结构化对象

**Kind**: static method of [<code>qyjUtils</code>](#module_qyjUtils)  
**Returns**: <code>Object</code> - {year, month, day}  
<a name="module_qyjUtils.toDateStr"></a>

### qyjUtils.toDateStr(date) ⇒ <code>String</code>
获取日期字符串

**Kind**: static method of [<code>qyjUtils</code>](#module_qyjUtils)  
**Returns**: <code>String</code> - 日期字符串，比如：'2022-5-20'  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Object</code> | 结构化日期对象 |

<a name="module_qyjUtils.toFMD"></a>

### qyjUtils.toFMD(dateStr) ⇒ <code>Object</code>
返回日期字符串对应的结构化对象

**Kind**: static method of [<code>qyjUtils</code>](#module_qyjUtils)  
**Returns**: <code>Object</code> - {year, month, day}  

| Param | Type | Description |
| --- | --- | --- |
| dateStr | <code>String</code> | 日期字符串 |

<a name="module_qyjUtils.addNDay"></a>

### qyjUtils.addNDay(date, n) ⇒ <code>Object</code>
获取某日的后n天日期对象：按时间戳计算偏移，再反解析为日期

**Kind**: static method of [<code>qyjUtils</code>](#module_qyjUtils)  
**Returns**: <code>Object</code> - 日期对象  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Object</code> | 日期对象 |
| n | <code>Number</code> | 数字 |

<a name="module_qyjUtils.substractNDay"></a>

### qyjUtils.substractNDay(date, n) ⇒ <code>Object</code>
获取某日的前n天日期对象：按时间戳计算偏移，再反解析为日期

**Kind**: static method of [<code>qyjUtils</code>](#module_qyjUtils)  
**Returns**: <code>Object</code> - 日期对象  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Object</code> | 日期对象 |
| n | <code>Number</code> | 数字 |

<a name="module_qyjUtils.getLunarDay"></a>

### qyjUtils.getLunarDay(date) ⇒ <code>String</code>
获取农历是哪天（初几）

**Kind**: static method of [<code>qyjUtils</code>](#module_qyjUtils)  
**Returns**: <code>String</code> - 农历日子。比如：'初三'  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Object</code> | 日期对象 |