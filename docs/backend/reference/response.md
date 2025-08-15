---
title: 接口响应
---

我们为 fba 开发了十分灵活且健全的接口响应系统，它同时适用于任何 FastAPI 应用

## 统一返回模型

在常规 web 应用开发中，通常情况下，响应结构总是统一的，但在 FastAPI 的官方教程中，并没有提示我们该如何这样做，其实，这很简单，
只需我们提供一个统一的 pydantic 模型

```python
class ResponseModel(BaseModel):
    code: int = CustomResponseCode.HTTP_200.code
    msg: str = CustomResponseCode.HTTP_200.msg
    data: Any | None = None
```

以下是使用此模型进行返回的示例（遵循 FastAPI 官方教程），`response_model` 参数和 `->` 类型选择其中一种方式即可，FastAPI
会在内部自动解析并获取最终响应结构

`response_model` 参数：

```python{1,3}
@router.get('/test', response_model=ResponseModel)
def test():
    return ResponseModel(data={'test': 'test'})
```

`->` 类型：

```python{2,3}
@router.get('/test')
def test() -> ResponseModel:
    return ResponseModel(data={'test': 'test'})
```

## Schema 模式

上面我们已经讲解了统一返回模型，但是，FastAPI 中的优势之一还包括完全自动的 OpenAPI 和文档，如果我们全局使用
ResponseModel 做为统一响应模型，你会在 Swagger 文档得到（如图所示）

![response_model](/images/response_model.png)

显然，我们无法获取响应中的 data 数据结构。此时前端同事找到你，你会告诉他们，你请求一下不就行了？（没毛病，但显然不太友好），下面是我们创建的用于
Schema 模式的统一返回模型

```python
class ResponseSchemaModel(ResponseModel, Generic[SchemaT]):
    data: SchemaT
```

以下是使用此模型进行返回的示例（遵循 FastAPI 官方教程），它的用法与 ResponseModel 基本相似

`response_model` 参数：

```python{1,3}
@router.get('/test', response_model=ResponseSchemaModel[GetApiDetail])
def test():
    return ResponseSchemaModel[GetApiDetail](data=GetApiDetail(...))
```

`->` 类型：

```python{2,3}
@router.get('/test')
def test() -> ResponseSchemaModel[GetApiDetail]:
    return ResponseSchemaModel[GetApiDetail](data=GetApiDetail(...))
```

此时我们再来看一眼 Swagger 文档

![response_schema_model](/images/response_schema_model.png)

我们可以看到，响应 Schema 中的 data 已经包含我们的响应体结构了，响应体结构正是解析的 `[]` 中的 Schema 模型，它们是对应的，如果返回的数据结构与
Schema 不一致，将引发解析错误

我们建议将这种方式仅用于查询接口，如果你不需要这种文档，你完全可以不使用它，而是使用更加开放的统一响应模型
ResponseModel

## 统一返回方法

`response_base` 是我们做的全局响应实例，它大大简化了响应返回方式，用法如下：

```python{2-3,7-8}
@router.get('/test')
def test() -> ResponseModel:
    return response_base.success(data={'test': 'test'})


@router.get('/test')
def test() -> ResponseSchemaModel[GetApiDetail]:
    return response_base.success(data=GetApiDetail(...))
```

此实例包含三个返回方法：`success()`、`fail()`、`fast_sucess()`

::: warning
它们都是同步方法，而不是异步。因为这些返回方法并不涉及 io 操作，所以，定义为异步，不但没有性能提升，反而增加了异步协程的开销
:::

::: tabs
@tab <Icon name="ix:success-filled" />`success()`

此方法通常作为默认响应方法使用，默认返回信息如下

```json:no-line-numbers
{
  "code": 200,
  "msg": "请求成功",
  "data": null
}
```

@tab <Icon name="ix:namur-failure-filled" />`fail()`

此方法通常在接口响应信息为失败时使用，默认返回信息如下

```json:no-line-numbers
{
  "code": 400,
  "msg": "请求错误",
  "data": null
}
```

@tab <Icon name="ix:certificate-success-filled" />`fast_success()`

此方法通常仅用于接口返回大型 json 时，可为 json 解析性能带来质的提升，默认返回信息如下

```json:no-line-numbers
{
  "code": 200,
  "msg": "请求成功",
  "data": null
}
```

:::

## 响应状态码

在文件 `backend/common/response/response_code.py` 中内置了多种定义响应状态码的方式，我们可以根据 `CustomResponseCode` 和
`CustomResponse` 定义自己需要的的响应状态码，因为在实际项目中，响应状态码并没有统一的标准

当我们定义好自定义响应状态码之后，可以像下面这样使用

```python{3-4}
@router.get('/test')
def test() -> ResponseModel:
    res = CustomResponse(code=0, msg='成功')
    return ResponseModel(res=res, data={'test': 'test'})
```

## 驼峰返回

我们默认使用 python 下划线命名法进行数据返回，但是，在实际工作中，前端目前大多使用小驼峰命名法，所以，我们就需要对此进行一些修改来适配前端工程，在文件
`backend/common/schema.py` 中，我们有一个 `SchemaBase` 类，它是我们的全局 Schema 基础类，修改如下：

```python
class SchemaBase(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,  # [!code ++] 允许通过原始字段名或别名进行赋值
        alias_generator=to_camel,  # [!code ++] 自动将字段名转换为小驼峰
        use_enum_values=True,
        json_encoders={datetime: lambda x: x.strftime(settings.DATETIME_FORMAT)},
    )
```

其中，`to_camel` 方法引入自
pydantic，详情：[pydantic.alias_generators](https://docs.pydantic.dev/latest/api/config/#pydantic.alias_generators)

完成以上修改后，Schema 模式和返回数据将自动转为小驼峰命名

## 国际化

[请移步至 **国际化**](./i18n.md){.read-more}
