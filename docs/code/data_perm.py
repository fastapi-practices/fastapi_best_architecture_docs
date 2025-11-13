def filter_data_permission(request_user: GetUserInfoWithRelationDetail, model: Any) -> ColumnElement[bool]:
    """
    过滤数据权限，控制用户可见数据范围

    使用场景：
        - 控制用户能看到哪些数据

    :param request_user: 请求用户
    :param model: 需要进行数据过滤的 sqlalchemy 模型
    :return:
    """
    # 超级管理员可查看所有数据
    if request_user.is_superuser:
        return or_(1 == 1)

    # 无角色只能查看自己数据
    if not request_user.roles:
        return or_(getattr(model, 'created_by') == request_user.id if hasattr(model, 'created_by') else 1 == 0)

    data_scope = min(role.data_scope for role in request_user.roles if role.status == 1)
    user_dept_id = user.dept_id

    # 全部数据权限
    if data_scope == 0:
        return or_(1 == 1)

    # 自定义数据权限
    elif data_scope == 1:
        dept_ids = select(role_dept.c.dept_id).where(
            role_dept.c.role_id.in_(role.id for role in request_user.roles if role.status == 1)
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
        return or_(getattr(model, 'created_by') == request_user.id if hasattr(model, 'created_by') else 1 == 0)

    # 默认
    else:
        return or_(1 == 0)