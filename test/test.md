title: C++操作SQL Server数据库
date: 2013-03-19
categories: 问题修复
tags: [C++, SQLServer]
---

## 前期准备

1. 导入库

```
	#import "c:\Program Files\Common Files\System\ADO\msado15.dll" \
	no_namespace rename("EOF", "EndOfFile")
```
<!-- more -->

2. COM初始化（进程级使用只需初始化一次，如果在线程中使用，则在线程函数中每次执行初始化）

	::CoInitialize(NULL);

3. 关键变量

	_ConnectionPtr m_pConnection;

## 简单实例

	m_pConnection.CreateInstance("ADODB.Connection");
	m_pConnection->Open(connStr,"","",adModeUnknown);
	char query_cmd[500] = {0};

	...

	m_pConnection->Execute(query_cmd,NULL,1); //用Execute执行sql语句来执行写入
	m_pConnection->Close();

## 常见错误`_com_error`的处理

使用try catch语句捕获异常信息，确定错误原因：

```
try
{
	m_pConnection->Execute(query_cmd,NULL,1);
}
catch(_com_error& e)
{
	MessageBox(NULL, e.Description(), e.ErrorMessage(), MB_ICONERROR);
	return;
}
```

## 一个恶心的Bug，更新于[2013,6,3]

最近同事使用上述代码操作数据，在Win7和Windows Server 2008R2上运行OK，当拿到XP或者Windows 2003上去跑，遇到如下错误：

```
This application has requested the Runtime to terminate it in an unusual way. Please contact the application's support team for more information.
```

我们各种排查，最后找出原因为：

> WIN7的ado15.dll与其他系统不兼容！！！拷贝个XP的ado15.dll到WIN7下在编译，或者直接把工程移到XP下重新编译一次；

> 这个问题，好像从vista开始就对msado15.dll进行了扩展，悲催的是前后不兼容。 

最终我们没动一行代码，在Win2003上重新编译，就可以在xp上跑了。此时，解决这个问题我们已经花费了3个多小时，对于这个错误原因，我表示真的很蛋疼！！！！

做个文明人，这里就不骂微软了。