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

#### Default Value

Để tạo `default value` cho `reactr-hook-form`, thêm 1 tham số vào hook `useForm`. Tham số này là 1 object có chứa key `defaultValues`.

Giá trị của key `defaultValues`:

- Là một object, mỗi key trong object này tương ứng với `name` của các field trong form, value là giá trị mặc định muốn set.

```
const form = useForm<FormTypes>({
  defaultValues: {
    username: "",
    email: "",
    channel: ""
  }
})
```

- Là một function cho trường hợp sử dụng data từ API để làm giá trị mặc định. Function này bắt buộc return về object chứa các giá trị mặc định như trường hợp trên.

```
const form = useForm<FormTypes>({
  defaultValues: async () => {
    const response = await fetch("url-api.com");
    const data = await response.json();

    return {
      username: data.username,
      email: data,email,
      channel: data.channel
    }
  }
})
```

#### Nested Object

Một số trường hợp sau khi submit form, một số data cần phải gom nhóm thành những object để gửi lên server cho đúng format.

`react-hook-form` cũng hỗ trợ luôn tính năng này, developer ko cần phải gom nhóm data thành những nested object bên trong function `onSubmit`.

Cách thực hiện:

- Định nghĩa type cho các field cần group tương tự như các field khác
- Thêm default value cho các values này (nếu cần thiết).
- Tạo các element tương ứng để user có thể nhập liệu data, lưu ý tên của các field này cần phải đặt đúng format nested object: `<parent-key>.<child-key>`.

```
const form = useForm({
  defaultValues: {
    social: {
      twitter: "",
      facebook: ""
    }
  }
})

...

<input type="text" {...register("social.twitter")} />
<input type="text" {...register("social.facebook")} />
```

#### Array data

Tương tự như `nested Object`, đôi khi data từ form phải được chuyển thành Array trước khi gửi data lên server.

Cách nhóm data vào `Array` khá giống `nested object` ở 2 bước khai báo `type` và `defaultValues`.

- Định nghĩa type cho các field cần group tương tự như các field khác
- Thêm default value cho các values này (nếu cần thiết).
- Tạo các element tương ứng để user có thể nhập liệu data, lưu ý tên của các field này cần phải đặt đúng format: `<field-name>.<index>`.

Ví dụ: nhập 2 số điện thoại (primary và secondary phone number)

```
const form = useForm({
  defaultValues: {
    phoneNumbers: ["", ""]
  }
})

...

<input type="text" {...register("phoneNumbers.0")} />
<input type="text" {...register("phoneNumbers.1")} />
```

#### Multiple Input

Ở ví dụ trên, chúng ta thực hiện lưu trữ 2 số điện thoại vào 1 array để submit. Tuy nhiên, nó chỉ hoạt động tốt khi chúng ta biết chính xác được số lượng `phone number input`.

Để dynamic số lượng phone number, sử dụng trong trường hợp user có quyền add thêm bao nhiêu số tuỳ thích. Ta phải sử dụng `dynamic input`.

Để sử dụng dynamic field, ta thực hiện các bước sau:

1. Import hook `useFieldArray` từ thư viện `react-hook-form`.
2. Thêm một gía trị mới vào type FormValues để lưu trữ các phone number. Giá trị này ví dụ đặt tên là `phNumbers`, là một array chưa các phần tử là object, mỗi object có 1 key duy nhất là `number` có kiểu string

```
  phNumbers: {
    number: string
  }[]
```

3. Tạo giá trị mặc định của `phNumbers: [{ number: "" }]`. Một phần tử đại diện cho ban đầu có 1 số điện thoại để user nhập.
4. Cần khai báo giá trị `phNumbers` là array gồm nhiều field khác nhau cho `react-hook-form` biết thông qua `useFieldArray`

```
const { ... control, ...} = form;

const { fields } = useuseFieldArray({
  name: 'phNumbers',
  control
})
```

Giá trị tuyền vào hook là một object, chứa các key như sau:

- `name`: tên của field cần khai báo, ở đây là `phNumbers`
- `control`: chính là data control được destructure từ `form`

Giá trị trả về của hook là một object, với các key như sau:

- `fields`: chưa data của các field được dynamic và lưu vào `phNumbers` như id (dùng để render jsx), value, error hoặc validation.

5. Thêm jsx tương ứng với list `fields` ở trên. Lưu ý phần register, name của field trong array sẽ có cấu trúc như sau: `<data-name>.<index-in-list>.<data-key-name>`.

Ở ví dụ trên sẽ là: `phNumbers.${index}.number`: với `index` là index tương ứng của từng field trong array `fields`.

Để user thêm được phone number mới vào list, thêm button để handle, khi click button sẽ thực thi function `append` cũng được return về từ hook `useuseFieldArray`. Tham số của function này là một object `{ number: "" }`.

Từ phone number thứ 2 trở đi, sẽ có nút `remove` để user xoá số đt. Tương tự như `append`, function `remove` được trả về trong hook `useuseFieldArray`. Tham số của function remove là index của field tương ứng.

```
const { fields, append, remove } = useuseFieldArray({
  name: 'phNumbers',
  control
})

<div>
  {fields.map((field, index) => {
    return (
      <div>
        <input key={field.id} type="text" {...register(`phNumbers.${index}.number`)}/>
        {index > 0 && <button type="button" onClick={() => remvove(index)}>Remove</button>}
      </div>
    )
  })}
  <button type="button" onClick={() => append({number: ""})}>Add phone number</button>
</div>
```

#### Number Field and Date Field

Mặc định `react-hook-form` sẽ lưu các giá trị `number` hoặc `Date` ở dạng `string`. Để nó vẫn lưu đúng giá trị number, chúng ta thêm 1 option vào function register của field đó `valueAsNumber: true` hoặc `valueAsDate: true`.

```
<input type="number" {register('age', { required: {...}, valueAsNumber: true })}/>
<input type="date" {register('dob', { required: {...}, valueAsDate: true })}/>
```

#### Theo dõi thay đổi của giá trị trong form

Trong thực tế, ngoài các tác vụ như validation, submit form thì có một số trường hợp cần preview data khi nhập form cũng như thực hiện các action side effect (như call api search, manipulate DOM).

RHF cung cấp một function để thực hiện việc này `watch`, destructure từ object `form`.

Function `watch` sẽ trigger re-render UI nếu nó được call bên trong component, hoặc subscribe sự thay đổi values của form.

1. Trường hợp sử dung form values để hiển thị ra UI

Thực thi function `watch`, data trả về như sau:

- `watch()`: ko có tham số, trả về object với tất cả data trong form, mỗi một key value là tên field và value tương ứng
- `watch(<field-name>)`: tham số là 1 field name, data trả về là value của field đó.
- `watch([<field-name-1, field-name-2>])`: tham số là array tên các field, data trả về là array các value tương ứng theo đúng thứ tự

```
const { watch } = form;

const valueUsername = watch("username"); // string of user name
const valueUsernameEmail = watch(["username", "email"]); // array [valueUsername, valueEmail]
const valueAll = watch(); // object với data của tất cả các field
```

2. Trường hợp lắng nghe form values để thực thi side effect

Trong hook `useEffect`, khai báo dependency là function `watch`, do vậy `useEffect` phải đặt bên dưới phần khai báo `form` và `watch`.

Thực thi function `watch` bên trong useEffect.

```
useEffect(() => {
  const subcription = watch((value) => {
    // do something side effect
    // value is a object that contains all data of form, similar valueAll object above
  });

  return () => {
    // clear event when unmount
    subcription.unsubcribe();
  }

}, [ watch ]);
```

- Tham số truyền vào là một callback fn, callback function này có tham số chính là object chưa data của form, chúng ta sẽ thực hiện các side effect bên trong callback fn này.

- Gía trị trả về là một object có method unsubcribe, do `watch` được thực thi trong useEffect có nghĩa là nó đã subcribe một sự thay đổi data trên form, do vậy khi unmount component chúng ta phải `unsubcribe`.

#### Get Form Values

RHF cung cấp một function để lấy ra các value của form, `getValues`, cũng destructure từ `form`.

Function `getValues` có cú pháp hoàn toàn giống với `watch` trong trường hợp hiển thị ra UI.

- `getValues()`: ko có tham số, trả về object với tất cả data trong form, mỗi một key value là tên field và value tương ứng
- `getValues(<field-name>)`: tham số là 1 field name, data trả về là value của field đó.
- `getValues([<field-name-1, field-name-2>])`: tham số là array tên các field, data trả về là array các value tương ứng theo đúng thứ tự

Điểm khác nhau giữa `getValues` so với `watch`, là nó không trigger re-renders component hay subscribe sự thay đổi values, nên nó sẽ không thực thi khi thay đổi values.

Do vậy, function `getValues` thường được sử dụng khi user trigger một event nào đó như click button.

```
const { getValues } = form;

const handleGetValues = () => {
  const data = getValues();
  // do something
}

<button type="button" onClick={handleGetValues}>Click</button>

```

#### Set Value cho field

RHF cung cấp một function cho phép thay đổi value của một field bất kỳ: `setValue`.

Function `setValue` nhận vào 3 tham số:

1. Field-name: tên của field cần update
2. New-field-value: giá trị mới của field
3. (Optional): là option object, chưa các key để update state của field đó như `shouldValidate`, `shouldDirty` và `shouldTouch`.

```
const { setValue } = form;

const handleSetValue = () => {
  setValue("username", "", {
    shouldValidate: false,
    shouldDirty: true,
    shouldTouch: true
  })
}
```

#### State: Dirty và Touch

1. Touched

- `false`: mặc định
- `true`: khi user đã có tương tác với field, cụ thể là focus và sau đó blur.

2. Dirty

- `false`: mặc định hoặc khi user thay đổi giá trị, và giá trị mới giống với gía trị mặc định
- `true`: khi user thay đổi giá trị của field, giá trị mới khác với giá trị mặc định

3. RHF cung cấp một số thuộc tính để access vào state của form và state của field. Destructure `formState` từ form, tiếp tục destructure từ `formState` các thuộc tính:

- `touchedFields`: object chứa các key là các name-field, value là trạng thái `touched` của field đó `true | false`
- `dirtyFields`: object chứa các key là các name-field, value là trạng thái `dirty` của field đó `true | false`
- `isDirty`: boolean, cho biết form đã được thay đổi giá trị khác so với giá trị mặc định hay chưa (chỉ cần 1 field thay đổi --> true).

#### Disable Field

Để `disabled` input field, bạn có thể sử dụng thuộc tính disabled mặc định của thẻ input.

Bên cạnh đó, RHF cũng cung cấp một cách để disabled một field thông qua function `register`. Thêm vào options object (tham số thứ 2 của register) thuộc tính `disabled`.

```
  {...register("field-name", {
    disabled: true,
    // ...
  })}
```

- Lưu ý: khi một field được `disabled`, giá trị khi submit của nó mặc định là `undefined`, và field đó sẽ được bỏ qua phần validation.
