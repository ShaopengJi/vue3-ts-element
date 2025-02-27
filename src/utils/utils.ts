// 参数处理
export const tansParams = (params: any) => {
  let result = ""
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof value[key] !== "undefined") {
            const params = propName + "[" + key + "]"
            const subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}
// 验证是否为blob格式
export const blobValidate = (data: any) => {
  return data.type !== "application/json"
}
onDocumentMouseMove = (event, self) => {
  self.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  self.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  // let domRect = this.dom.getBoundingClientRect()
  // self.mouse.x = ((event.clientX - domRect.left) / domRect.width) * 2 - 1
  // self.mouse.y = -((event.clientY - domRect.top) / domRect.height) * 2 + 1
  self.raycaster.setFromCamera(self.mouse, self.camera)
  let intersects = []
  intersects = self.raycaster.intersectObjects(self.scene.children, true, intersects)
  // console.log('intersects', intersects)
  if (intersects && intersects.length > 0) {
    let name = ""
    if (self.electricalTimerSchedule == null) {
      name = intersects[0].object.name
    } else {
      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.name.indexOf("DT") > -1) {
          name = intersects[i].object.name
          // console.log('name', name)
          intersects = [intersects[i]]
          break
        }
      }
    }
    console.log("!!!!!!!!!!!!", name)
  }
}
