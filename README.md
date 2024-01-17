## useForm

Để tạo ra 1 form trong `react-hook-form` sử dụng hook `useForm`.

```
const form = useForm();
```

#### register

Để register 1 field với react hook form, sử dụng function `register` trong object `form`:

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
