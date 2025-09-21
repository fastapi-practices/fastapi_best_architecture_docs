def filter_data_permission(request: Request, model: Any) -> ColumnElement[bool]:
    """
    过滤用户数据权限

    :param request: 接口请求对象
    :param model: 需要进行数据过滤的 sqlalchemy 模型
    :return:
    """
    user = request.user

    # 超级管理员可查看所有数据
    if user.is_superuser:
        return or_(1 == 1)

    user_id = user.id
    user_roles = user.roles

    # 无角色只能查看自己数据
    if not user_roles:
        return or_(getattr(model, 'created_by') == user_id if hasattr(model, 'created_by') else 1 == 0)

    data_scope = min(role.data_scope for role in user_roles if role.status == 1)
    user_dept_id = user.dept_id

    # 全部数据权限
    if data_scope == 0:
        return or_(1 == 1)

    # 自定义数据权限
    elif data_scope == 1:
        dept_ids = select(sys_role_dept.c.dept_id).where(
            sys_role_dept.c.role_id.in_(role.id for role in user_roles if role.status == 1)
        )
        return or_(getattr(model, 'dept_id').in_(dept_ids) if hasattr(model, 'dept_id') else 1 == 0)

    # 部门及以下数据权限
    elif data_scope == 2:
        child_dept_ids = select(Dept.id).where(or_(Dept.id == user_dept_id, Dept.parent_id == user_dept_id))
        return or_(getattr(model, 'dept_id').in_(child_dept_ids) if hasattr(model, 'dept_id') else 1 == 0)

    # 本部门数据权限
    elif data_scope == 3:
        return or_(getattr(model, 'dept_id') == user_dept_id if hasattr(model, 'dept_id') else 1 == 0)

    # 仅本人数据权限
    elif data_scope == 4:
        return or_(getattr(model, 'created_by') == user_id if hasattr(model, 'created_by') else 1 == 0)

    # 默认
    else:
        return or_(1 == 0)