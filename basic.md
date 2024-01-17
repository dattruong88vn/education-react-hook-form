## useForm

Để tạo ra 1 form trong `react-hook-form` sử dụng hook `useForm`.

```
const form = useForm();
```

#### register

Để register 1 field với react hook form, sử dụng function `register` trong object `form`:

Function `register` nhận vào tham số đầu tiên là tên của input field tương ứng.

```
const { register } = form;
const dataRegister = register("<field-name>")
```

Object dataRegister gồm có: `name`, `ref`, `onChange` và `onBlur`. Chúng ta cần bind các data này vào field có name tương ứng để `react-hook-form` control được field.

```
<input type="text" {...register('username')}/>
```

#### Tracking form values

Để theo dõi form state của `react-hook-form`, chúng ta sử dụng thư viện `@hookform/devtools`.

Sau khi cài đặt thư viện, import devtool vào component có chứa form.
Khai báo một component `<Devtool />` ngay trong Component và truyền vào props `control`, giá trị của props này chính là object control của object form ở trên.

```
import { DevTool } from `@hookform/devtools`

const { control } = form;

<DevTool control={control}/>
```

#### Form State và Re-renders

Khi user nhập thông tin và các field đã được control bởi `react-hook-form`, data sẽ được update ngay lập tức trong `devtool` tuy nhiên sẽ ko làm cho Component Re-render. Điều này rất tốt cho performance.

Thông thường nếu ko sử dụng third-party library, muốn control form trong react, chúng ta có 2 cách thông dụng nhất:

- Sử dụng `state`: dễ viết nhưng khiến component bị re-render sau mỗi ký tự user nhập vào.
- Sử dụng `ref`: khắc phục được vấn đề re-render tuy nhiên lại khá dài dòng, khi có nhiều form thì sẽ khó đọc code và maintain.

Rõ ràng, `react-hook-form` đã xử lý được cả 2 yếu tố trên.

#### Submit form

Để submit form, thực hiện các bước sau:

- Tạo function sẽ được thực thi khi nhấn button submit: ví dụ `onSubmit`.
- Từ `object form`, destructure thêm function `handleSubmit`. Function này nhận vào 1 tham số, chính là function sẽ được thực thi khi nhấn submit
- Function `onSubmit` sẽ nhận được 1 đối số chính là object chứa data của form.

```
const { handleSubmit } = form;
const onSubmit = (data) => {}

<form onSubmit={handleSubmit(onSubmit)}>
...
</form>
```

#### Typescript

Đối với `typescript` ta cần khai báo kiểu dữ liệu của form, với các field tương ứng.
Khai báo kiểu dữ liệu này vào `useForm` hook để `react-hook-form` nhận diện.
Lúc này, trong function `onSubmit`, kiểu dữ liệu của form cũng cần được khai báo.

```
type FormValues = {...}

const form = useForm<FormValues>();

const onSubmit = (data: FormValues) => {...}

<form onSubmit={handleSubmit(onSubmit)}>
  ...
</form>
```

#### Validation

`react-hook-form` hỗ trợ một số kiểu validate cho form như: `require`, `minLength`, `maxLength`, `min`, `max`, `pattern`....

Disable chức năng validation mặc định của browser, thêm props `noValidate` vào thẻ `form`.

Để thêm validation cho 1 input field, truyền vào function `register` tương ứng của field đó tham số thứ 2. Tham số này là một options object với một số cặp key-value như sau:

1. `required` attribute: value là message lỗi khi không nhập data

```
register("username", {
  required: "Username is required"
})
```

`value` cũng có thể khai báo dưới dạng object:

```
register('username', {
  required: {
    value: true,
    message: "Username is required"
  }
})
```

Thông tin `error` và `message` tương ứng có thể theo dõi trong `Devtool`

2. `pattern` attribute: value là object gồm có:

- value: là một regex
- message: là message lỗi khi giá trị nhập vào không thoả pattern

```
register('username', {
  required: {
    value: true,
    message: "Username is required"
  },
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "Invalid email format",
  },
})
```

###### Hiển thị thông tin errors

Thông tin của `errors` được `react-hook-form` đăt bên trong `object form`. Cụ thể là `form.formState.errors`

```
const { formState } = form;
const { errors } = formState;
```

`errors` là object, với mỗi key tương ứng với tên của một field, value là tất cả thông tin validation của field đó.

Để hiển thị message-error, `errors['field-name']?.message`:

```
<p>{errors.username?.message}</p>
```

3. `validate` attribute: dùng để custom validation

Giá trị của `validate` attribute là một function: trường hợp chỉ có một logic để custom.

- Tham số là fieldValue
- Giá trị trả về: `true` cho trường hợp pass validate hoặc string message cho trường hợp failed và hiển thị message lỗi.

```
  validate: (fieldValue) => {
    return (
      fieldValue !== "admin@example.com" || "Enter another email"
    );
  },
```

Giá trị `validate` attribute còn có thể là một object, mỗi key trong object là một function như cách trên.

```
  validate: {
    notAdmin: (fieldValue) => {
      return (
        fieldValue !== "admin@example.com" || "Enter another email"
      );
    },
    notBlackList: (fieldValue) => {
      return (
        !fieldValue.endsWith("baddomain.com") ||
        "This domain is not support"
      );
    },
  },
```
